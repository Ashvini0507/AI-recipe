import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Mail, Lock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';

export const SignupPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { signup } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        preference: 'veg' as 'veg' | 'non-veg',
        language: i18n.language
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setFormData({ ...formData, language: lang });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        try {
            await signup(
                formData.name,
                formData.email,
                formData.password,
                formData.preference,
                formData.language
            );
            setMessage({ type: 'success', text: 'Account created successfully! Redirecting to login...' });
            
            // Redirect to login after successful signup
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            console.error('Signup failed:', error);
            setMessage({ type: 'error', text: error.message || 'Signup failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen bg-transparent flex items-center justify-center p-4 relative overflow-hidden"
            id="signup-page-container"
        >
            <motion.div 
                className="w-full max-w-md relative z-10"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div
                    className="w-full bg-card/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-border/50 relative z-10"
                >
                {/* Language Selector */}
                <div className="bg-muted/50 p-5 border-b border-border" id="signup-lang-selector">
                    <div className="flex justify-center gap-3">
                        {[
                            { code: 'en', label: 'En' },
                            { code: 'hi', label: 'हि' },
                            { code: 'ta', label: 'த' },
                            { code: 'ml', label: 'മ' }
                        ].map((lang) => (
                            <button
                                key={lang.code}
                                id={`lang-select-${lang.code}`}
                                type="button"
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-11 h-11 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${i18n.language === lang.code
                                    ? 'border-primary bg-primary/20 text-primary shadow-lg shadow-primary/10 scale-110'
                                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-10">
                    {/* Logo */}
                    <div className="text-center mb-10">
                        <div className="inline-block bg-primary/10 p-5 rounded-[2rem] mb-5 border border-primary/20 shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:scale-150 transition-all duration-700" />
                            <ChefHat className="w-12 h-12 text-primary relative z-10" />
                        </div>
                        <h1 className="text-3xl font-black text-foreground tracking-tighter leading-none mb-3 drop-shadow-xl">{t('auth.signup')}</h1>
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{t('auth.subtitle')}</p>
                    </div>

                    {message && (
                        <div className={`mb-6 p-4 rounded-2xl text-xs font-bold uppercase tracking-wider ${
                            message.type === 'success' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-destructive/10 text-destructive border border-destructive/20'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" id="signup-form">
                        <div className="space-y-3">
                            <Label htmlFor="signup-name" className="flex items-center gap-3 text-[10px] font-black text-muted-foreground ml-2 uppercase tracking-[0.2em] opacity-80">
                                <User className="w-4 h-4 text-primary" />
                                {t('auth.name')}
                            </Label>
                            <Input
                                id="signup-name"
                                type="text"
                                placeholder={t('auth.placeholder_name')}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="rounded-[1.5rem] border-border bg-muted/50 h-14 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all px-6 border-2"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="signup-email" className="flex items-center gap-3 text-[10px] font-black text-muted-foreground ml-2 uppercase tracking-[0.2em] opacity-80">
                                <Mail className="w-4 h-4 text-primary" />
                                {t('auth.email')}
                            </Label>
                            <Input
                                id="signup-email"
                                type="email"
                                placeholder={t('auth.placeholder_email')}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="rounded-[1.5rem] border-border bg-muted/50 h-14 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all px-6 border-2"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="signup-password" className="flex items-center gap-3 text-[10px] font-black text-muted-foreground ml-2 uppercase tracking-[0.2em] opacity-80">
                                <Lock className="w-4 h-4 text-primary" />
                                {t('auth.password')}
                            </Label>
                            <Input
                                id="signup-password"
                                type="password"
                                placeholder={t('auth.placeholder_password')}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="rounded-[1.5rem] border-border bg-muted/50 h-14 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all px-6 border-2"
                            />
                        </div>

                        <div className="pt-4">
                            <Label className="mb-4 block text-[10px] font-black text-muted-foreground ml-2 uppercase tracking-[0.2em] opacity-80">{t('auth.diet_preference')}</Label>
                            <div className="flex gap-4" id="signup-diet-preference">
                                <button
                                    type="button"
                                    id="signup-veg-btn"
                                    onClick={() => setFormData({ ...formData, preference: 'veg' })}
                                    className={`flex-1 text-center py-4 px-2 rounded-2xl border-2 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg cursor-pointer ${
                                        formData.preference === 'veg'
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/40 hover:bg-primary/5'
                                    }`}
                                >
                                    🌱 {t('auth.vegetarian')}
                                </button>
                                <button
                                    type="button"
                                    id="signup-nonveg-btn"
                                    onClick={() => setFormData({ ...formData, preference: 'non-veg' })}
                                    className={`flex-1 text-center py-4 px-2 rounded-2xl border-2 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg cursor-pointer ${
                                        formData.preference === 'non-veg'
                                            ? 'border-destructive bg-destructive/10 text-destructive'
                                            : 'border-border bg-muted/50 text-muted-foreground hover:border-destructive/40 hover:bg-destructive/5'
                                    }`}
                                >
                                    🥩 {t('auth.non_veg')}
                                </button>
                            </div>
                        </div>


                        <Button
                            id="signup-submit-btn"
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-white rounded-[1.5rem] h-16 text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all active:scale-95 mt-8 group relative overflow-hidden disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="relative z-10">{t('auth.signup')}</span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 text-center pt-8 border-t border-border/50">
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                            {t('auth.have_account')}
                            <button
                                id="signup-to-login-link"
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-primary hover:text-primary/80 font-black ml-2 transition-all hover:underline underline-offset-8"
                            >
                                {t('auth.login')}
                            </button>
                        </p>
                    </div>
                </div>
                </div>
            </motion.div>
        </div>
    );
};
