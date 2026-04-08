const supabase = require('../config/supabase');

/**
 * Get user profile including language preference
 */
exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!supabase) {
            console.log('Serving mock profile (Server Fallback)');
            return res.json({ id: userId, name: 'Food Lover', language_code: 'en' });
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;

        res.json(data);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

/**
 * Update user language preference
 */
exports.updateLanguage = async (req, res) => {
    try {
        const { userId } = req.params;
        const { languageCode } = req.body;

        if (!languageCode) {
            return res.status(400).json({ error: 'languageCode is required' });
        }

        if (!supabase) {
            console.log('Mock language update (Server Fallback)');
            return res.json({ message: 'Language preference updated (Mock)', profile: { id: userId, language_code: languageCode } });
        }

        const { data, error } = await supabase
            .from('profiles')
            .update({ language_code: languageCode, updated_at: new Date() })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;

        res.json({ message: 'Language preference updated', profile: data });
    } catch (err) {
        console.error('Error updating language:', err.message);
        res.status(500).json({ error: 'Failed to update language preference' });
    }
};

/**
 * Handle new user signup with Supabase Auth
 */
exports.signup = async (req, res) => {
    try {
        const { name, email, password, preference, language } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        if (!supabase) {
            console.log('Mock signup (Server Fallback)');
            return res.status(201).json({ 
                message: 'User signed up successfully (Mock/Fallback)',
                user: { id: Date.now().toString(), name, email, preference, language }
            });
        }

        // Use admin.createUser so the email is auto-confirmed — no verification email needed
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,   // ← skip email confirmation step
            user_metadata: {
                full_name: name,
                preference: preference || 'veg',
                language: language || 'en'
            }
        });

        if (error) throw error;

        // Upsert profile row
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: data.user.id,
                    name: name,
                    email: email,
                    preference: preference || 'veg',
                    language_code: language || 'en',
                    updated_at: new Date()
                });
            
            if (profileError) {
                console.warn('Profile upsert warning:', profileError.message);
            }
        }

        res.status(201).json({ 
            message: 'Account created successfully! You can now log in.',
            user: data.user 
        });
    } catch (err) {
        console.error('Signup error:', err.message);
        res.status(500).json({ error: err.message || 'Failed to sign up user' });
    }
};

/**
 * Handle user login with Supabase Auth
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        if (!supabase) {
            console.log('Mock login (Server Fallback)');
            return res.json({ 
                user: { 
                    id: '1', 
                    name: 'Food Lover', 
                    email, 
                    preference: 'veg', 
                    language: 'en' 
                } 
            });
        }

        // First, try to sign in normally
        let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        // If login fails, check if it's because email is not confirmed
        // and auto-confirm the user via admin API
        if (authError) {
            const errMsg = authError.message?.toLowerCase() || '';
            if (errMsg.includes('email not confirmed') || errMsg.includes('invalid login credentials')) {
                // Try to find the user and confirm their email
                try {
                    const { data: userList } = await supabase.auth.admin.listUsers();
                    const existingUser = userList?.users?.find(u => u.email === email);

                    if (existingUser && !existingUser.email_confirmed_at) {
                        console.log(`Auto-confirming email for user: ${email}`);
                        await supabase.auth.admin.updateUserById(existingUser.id, {
                            email_confirm: true
                        });

                        // Retry login after confirming
                        const retry = await supabase.auth.signInWithPassword({ email, password });
                        if (!retry.error) {
                            authData = retry.data;
                            authError = null;
                        } else {
                            throw new Error('Invalid email or password. Please check your credentials.');
                        }
                    } else {
                        throw new Error('Invalid email or password. Please check your credentials.');
                    }
                } catch (adminErr) {
                    if (adminErr.message.includes('Invalid email or password')) throw adminErr;
                    throw new Error('Invalid email or password. Please check your credentials.');
                }
            } else {
                throw authError;
            }
        }

        // Fetch profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (profileError && profileError.code !== 'PGRST116') {
             console.warn('Profile fetch error during login:', profileError.message);
        }

        res.json({
            user: {
                id: authData.user.id,
                email: authData.user.email,
                name: profile?.name || authData.user.raw_user_meta_data?.full_name || 'User',
                preference: profile?.preference || authData.user.raw_user_meta_data?.preference || 'veg',
                language: profile?.language_code || authData.user.raw_user_meta_data?.language || 'en'
            }
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(401).json({ error: err.message || 'Invalid credentials' });
    }
};

/**
 * Get all user profiles (Admin Only)
 */
exports.getAllProfiles = async (req, res) => {
    try {
        if (!supabase) {
            console.log('Serving mock users (Server Fallback)');
            return res.json([
                { id: '1', name: 'John Doe', email: 'john@example.com', created_at: new Date(), preference: 'veg' },
                { id: '2', name: 'Alice Smith', email: 'alice@example.com', created_at: new Date(), preference: 'non-veg' }
            ]);
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error fetching profiles:', error);
            throw error;
        }

        console.log(`Fetched ${data?.length || 0} profiles from Supabase`);
        res.json(data);
    } catch (err) {
        console.error('Error fetching all profiles:', err.message);
        res.status(500).json({ error: 'Failed to fetch user list' });
    }
};

/**
 * Handle forgot password request
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        if (!supabase) {
            console.log(`Mock forgot password for: ${email} (Server Fallback)`);
            return res.json({ 
                message: 'Password reset link sent to your email (Mock/Fallback)' 
            });
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/reset-password',
        });

        if (error) throw error;

        res.json({ 
            message: 'Password reset link has been sent to your email address.' 
        });
    } catch (err) {
        console.error('Forgot password error:', err.message);
        res.status(500).json({ error: err.message || 'Failed to send reset link' });
    }
};
