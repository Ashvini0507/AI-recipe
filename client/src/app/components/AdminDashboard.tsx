import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, PlusCircle, Users, LayoutDashboard, Utensils, ShieldAlert } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'addFood' | 'users'>('users');
    
    // Auth Check
    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdminAuth');
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuth');
        navigate('/admin/login');
    };

    // Form State for Food Menu
    const [foodData, setFoodData] = useState({
        title: '',
        image: '',
        category: 'veg',
        calories: '',
        ingredients: '',
        instructions: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddFood = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: foodData.title,
                    image_url: foodData.image,
                    cooking_time: 30, // Default or add to form
                    recipe_type: foodData.category,
                    calories: foodData.calories,
                    instructions: foodData.instructions.split('\n').filter(line => line.trim()), // Basic split by line
                    description: `A delicious ${foodData.category} recipe.` // Default
                })
            });

            if (!response.ok) throw new Error('Failed to add recipe');

            toast.success(`Recipe "${foodData.title}" added successfully!`);
            // Reset form
            setFoodData({
                title: '',
                image: '',
                category: 'veg',
                calories: '',
                ingredients: '',
                instructions: ''
            });
        } catch (error: any) {
            toast.error(error.message || 'Error adding recipe');
        } finally {
            setIsSubmitting(false);
        }
    };

    // User data from backend
    const [users, setUsers] = useState<any[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    useEffect(() => {
        if (activeTab === 'users') {
            const fetchUsers = async () => {
                setIsLoadingUsers(true);
                try {
                    const response = await fetch('http://localhost:5000/api/user');
                    if (!response.ok) throw new Error('Failed to fetch users');
                    const data = await response.json();
                    setUsers(data);
                } catch (error: any) {
                    toast.error('Error fetching users');
                } finally {
                    setIsLoadingUsers(false);
                }
            };
            fetchUsers();
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-transparent flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col h-auto md:h-screen sticky top-0 relative z-20">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 bg-red-500/10 rounded-xl">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-foreground leading-none">Admin Panel</h2>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Master Control</span>
                    </div>
                </div>

                <div className="space-y-2 flex-1 relative z-10">
                    <button
                        onClick={() => setActiveTab('addFood')}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${activeTab === 'addFood' ? 'bg-primary text-white shadow-[0_10px_30px_rgba(255,107,107,0.3)] scale-105 border border-white/20' : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'}`}
                    >
                        <Utensils className="w-5 h-5" />
                        Add Food Menu
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${activeTab === 'users' ? 'bg-primary text-white shadow-[0_10px_30px_rgba(255,107,107,0.3)] scale-105 border border-white/20' : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'}`}
                    >
                        <Users className="w-5 h-5" />
                        User List
                    </button>
                </div>

                <div className="pt-8 border-t border-white/10 mt-auto relative z-10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-5 py-5 rounded-2xl text-red-500 hover:bg-red-500/10 font-black uppercase tracking-widest transition-all text-[11px] border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-5 h-5" />
                        Secure Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto w-full max-w-[1200px] mx-auto" style={{ perspective: "1500px" }}>
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-foreground tracking-tighter flex items-center gap-3">
                        {activeTab === 'addFood' ? <><PlusCircle className="text-primary" /> Add New Recipe & Ingredients</> : <><Users className="text-primary" /> Registered User Directory</>}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {activeTab === 'addFood' ? 'Expand the recipe database by adding new dishes.' : 'Monitor platform activity and manage user accounts.'}
                    </p>
                </div>

                {/* Dashboard Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 flex items-center gap-5">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total Users</p>
                            <h3 className="text-2xl font-black text-foreground">{users.length}</h3>
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 flex items-center gap-5">
                        <div className="p-4 bg-green-500/10 rounded-2xl text-green-500">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">System Status</p>
                            <h3 className="text-2xl font-black text-green-500">Active</h3>
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 flex items-center gap-5">
                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Admin Mode</p>
                            <h3 className="text-2xl font-black text-blue-500">Master</h3>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, rotateY: 30, z: -100, x: 50 }}
                        animate={{ opacity: 1, rotateY: 0, z: 0, x: 0 }}
                        exit={{ opacity: 0, rotateY: -30, z: -100, x: -50 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {activeTab === 'addFood' && (
                            <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 shadow-3xl relative overflow-hidden group">
                                <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/20 blur-[120px] rounded-full transition-transform duration-700 group-hover:scale-110" />
                                <form onSubmit={handleAddFood} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Recipe Title</Label>
                                            <Input required placeholder="e.g. Masala Dosa" value={foodData.title} onChange={e => setFoodData({...foodData, title: e.target.value})} className="h-14 rounded-2xl bg-muted" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Image URL</Label>
                                            <Input required placeholder="https://..." value={foodData.image} onChange={e => setFoodData({...foodData, image: e.target.value})} className="h-14 rounded-2xl bg-muted" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Category</Label>
                                            <select 
                                                value={foodData.category}
                                                onChange={e => setFoodData({...foodData, category: e.target.value as 'veg' | 'non-veg'})}
                                                className="w-full h-14 rounded-2xl border border-border bg-muted px-4 font-medium focus:ring-primary focus:border-primary text-foreground outline-none"
                                            >
                                                <option value="veg">Vegetarian</option>
                                                <option value="non-veg">Non-Vegetarian</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Calories</Label>
                                            <Input required type="number" placeholder="e.g. 350" value={foodData.calories} onChange={e => setFoodData({...foodData, calories: e.target.value})} className="h-14 rounded-2xl bg-muted" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Ingredients (comma separated)</Label>
                                        <Textarea required placeholder="Rice, Urad Dal, Salt, Oil" value={foodData.ingredients} onChange={e => setFoodData({...foodData, ingredients: e.target.value})} className="min-h-[100px] rounded-2xl bg-muted resize-none p-4" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Cooking Instructions (One per line)</Label>
                                        <Textarea required placeholder="1. Soak rice&#10;2. Grind&#10;3. Make dosa" value={foodData.instructions} onChange={e => setFoodData({...foodData, instructions: e.target.value})} className="min-h-[150px] rounded-2xl bg-muted resize-none p-4" />
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit" disabled={isSubmitting} className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all text-lg disabled:opacity-50">
                                            {isSubmitting ? 'Adding...' : 'Submit Recipe to Database'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-muted">
                                                <th className="p-5 text-xs font-black uppercase tracking-widest text-muted-foreground">Name</th>
                                                <th className="p-5 text-xs font-black uppercase tracking-widest text-muted-foreground">Email</th>
                                                <th className="p-5 text-xs font-black uppercase tracking-widest text-muted-foreground">Preference</th>
                                                <th className="p-5 text-xs font-black uppercase tracking-widest text-muted-foreground border-r-0">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isLoadingUsers ? (
                                                <tr><td colSpan={4} className="p-10 text-center text-muted-foreground font-bold italic">Loading users...</td></tr>
                                            ) : users.length === 0 ? (
                                                <tr><td colSpan={4} className="p-10 text-center text-muted-foreground font-bold italic">No users found.</td></tr>
                                            ) : (
                                                users.map((u, i) => (
                                                    <tr key={u.id} className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${i === users.length - 1 ? 'border-b-0' : ''}`}>
                                                        <td className="p-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">
                                                                    {(u.full_name || u.name || 'U').charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="font-bold text-foreground">{u.full_name || u.name || 'N/A'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-5 text-sm text-foreground/80 font-medium">{u.email}</td>
                                                        <td className="p-5">
                                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${u.preference === 'veg' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                                {u.preference || 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="p-5 text-sm text-muted-foreground font-medium">{new Date(u.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
