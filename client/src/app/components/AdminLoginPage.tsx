import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Hardcoded admin credentials as requested
        if (formData.username === 'ashvini' && formData.password === 'ashvini@05072005') {
            sessionStorage.setItem('isAdminAuth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid Admin Credentials');
        }
    };

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - card.left;
        const mouseY = e.clientY - card.top;
        const centerX = card.width / 2;
        const centerY = card.height / 2;
        
        const tiltX = (mouseY - centerY) / 20;
        const tiltY = (centerX - mouseX) / 20;
        
        setRotateX(tiltX);
        setRotateY(tiltY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
        >
            <div className="w-full max-w-md relative z-10" style={{ transformStyle: "preserve-3d" }}>
                <motion.div
                    animate={{ rotateX, rotateY }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    initial={{ scale: 0.9, opacity: 0, z: -100 }}
                    whileInView={{ scale: 1, opacity: 1, z: 0 }}
                    className="w-full bg-red-950/10 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-red-500/20"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="bg-red-500/10 p-8 text-center border-b border-red-500/20" style={{ transform: "translateZ(20px)" }}>
                        <div className="inline-block bg-red-500/20 p-5 rounded-[1.75rem] mb-5 border border-red-500/30 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full group-hover:scale-150 transition-all duration-700" />
                            <Lock className="w-12 h-12 text-red-500 relative z-10" style={{ transform: "translateZ(30px)" }} />
                        </div>
                        <h1 className="text-3xl font-black text-red-950 tracking-tighter">Admin Portal</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mt-2">Restricted Access</p>
                    </div>

                    <div className="p-10" style={{ transform: "translateZ(40px)" }}>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-black uppercase tracking-widest text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="username" className="flex items-center gap-3 text-[10px] font-black text-red-950/70 uppercase tracking-[0.2em] ml-2">
                                    <User className="w-4 h-4 text-red-600" />
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter admin username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    required
                                    className="rounded-[1.5rem] border-red-500/20 bg-white/40 h-16 focus:ring-red-500 focus:border-red-500 text-red-950 px-6 border-2 placeholder:text-red-900/40"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="password" className="flex items-center gap-3 text-[10px] font-black text-red-950/70 uppercase tracking-[0.2em] ml-2">
                                    <Lock className="w-4 h-4 text-red-600" />
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="rounded-[1.5rem] border-red-500/20 bg-white/40 h-16 focus:ring-red-500 focus:border-red-500 text-red-950 px-6 border-2 placeholder:text-red-900/40"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] h-16 text-lg font-black uppercase tracking-widest shadow-2xl shadow-red-600/20 transition-all active:scale-95 group relative overflow-hidden mt-4"
                            >
                                <span className="relative z-10">Login to Dashboard</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </Button>
                        </form>
                        
                        <div className="mt-10 text-center pt-8 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-red-950/60 hover:text-red-600 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                            >
                                ← Return to User Login
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
