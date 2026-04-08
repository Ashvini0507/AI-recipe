import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';

const FOOD_EMOJIS = ['🍛', '🥗', '🍜', '🍱', '🥘', '🫓', '🥙', '🍲', '🌮', '🥞', '🍳', '🫕', '🥚', '🫔', '🥣', '🧆', '🫙', '🍚'];

export const LoginPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { login, changeLanguage: updateLanguageSync, forgotPassword } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        updateLanguageSync(lang);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        try {
            await login(formData.email, formData.password);
            // Explicitly navigate to home after login succeeds
            navigate('/home', { replace: true });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Login failed. Please check your credentials.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!formData.email) {
            setMessage({ type: 'error', text: 'Please enter your email first.' });
            return;
        }

        setIsLoading(true);
        setMessage(null);
        try {
            const res = await forgotPassword(formData.email);
            setMessage({ type: 'success', text: res.message });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to send reset email' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-stretch overflow-hidden bg-[#FCFBF7]" id="login-page-container">
            {/* ===== Left Panel — Dark decorative side ===== */}
            <div className="hidden lg:flex flex-col items-center justify-center w-[45%] relative bg-[#122D28] overflow-hidden px-12">
                {/* Subtle animated emoji grid in background */}
                <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4 opacity-[0.07] select-none pointer-events-none">
                    {Array.from({ length: 72 }).map((_, i) => (
                        <motion.span
                            key={i}
                            className="text-2xl flex items-center justify-center"
                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                            transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: (i * 0.12) % 3 }}
                        >
                            {FOOD_EMOJIS[i % FOOD_EMOJIS.length]}
                        </motion.span>
                    ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[500px] rounded-full bg-primary/15 blur-[140px]" />
                </div>

                <div className="relative z-10 text-center max-w-xs">
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="inline-flex items-center justify-center bg-primary/15 border border-primary/30 p-8 rounded-[3rem] mb-8 shadow-[0_0_80px_rgba(52,211,153,0.2)]"
                    >
                        <ChefHat className="w-14 h-14 text-primary" />
                    </motion.div>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl font-black text-white tracking-tighter leading-tight mb-3"
                    >
                        {t('header.title')}
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                        className="text-white/40 text-xs font-black uppercase tracking-[0.3em]"
                    >
                        {t('auth.subtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-2 mt-8"
                    >
                        {['AI Recipes', 'Meal Plans', 'Voice Cook', 'Ingredients'].map(f => (
                            <span key={f} className="bg-white/5 border border-white/10 text-white/50 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                {f}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ===== Right Panel — Form side ===== */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
                <div className="lg:hidden text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-primary/20 border border-primary/30 p-5 rounded-[2rem] mb-4">
                        <ChefHat className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-[#122D28] tracking-tighter">{t('header.title')}</h1>
                </div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden"
                >
                    <div className="px-8 pt-8 pb-5 border-b border-black/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[9px] font-black text-[#122D28]/30 uppercase tracking-widest">Language</span>
                        </div>
                        <div className="flex gap-1.5">
                            {[
                                { code: 'en', label: 'En' },
                                { code: 'hi', label: 'हि' },
                                { code: 'ta', label: 'த' },
                                { code: 'ml', label: 'മ' }
                            ].map((lang) => (
                                <button
                                    key={lang.code}
                                    id={`login-lang-${lang.code}`}
                                    type="button"
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-9 h-9 rounded-xl border text-[10px] font-black transition-all ${i18n.language === lang.code
                                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                        : 'border-black/5 text-[#122D28]/30 hover:border-primary/20 hover:text-primary bg-black/[0.02]'
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 sm:p-10">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-[#122D28] tracking-tighter leading-none">
                                {t('auth.welcome_back', 'Welcome Back!')}
                            </h1>
                            <p className="text-[#122D28]/30 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                                {t('auth.sign_in_subtitle', 'Sign in to continue')}
                            </p>
                        </div>

                        {message && (
                            <div className={`mb-6 p-4 rounded-xl text-xs font-bold uppercase tracking-wider ${
                                message.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
                            <div className="space-y-2">
                                <label htmlFor="login-email" className="flex items-center gap-2 text-[10px] font-black text-[#122D28]/40 uppercase tracking-[0.2em]">
                                    <Mail className="w-3.5 h-3.5 text-primary" />
                                    {t('auth.email')}
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder={t('auth.placeholder_email')}
                                    value={formData.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full h-14 rounded-2xl border-2 border-black/[0.06] bg-[#F8F7F3] px-5 text-[#122D28] placeholder:text-[#122D28]/20 font-bold text-base focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center pr-2">
                                    <label htmlFor="login-password" className="flex items-center gap-2 text-[10px] font-black text-[#122D28]/40 uppercase tracking-[0.2em]">
                                        <Lock className="w-3.5 h-3.5 text-primary" />
                                        {t('auth.password')}
                                    </label>
                                    <button
                                        type="button"
                                        id="login-forgot-password"
                                        onClick={handleForgotPassword}
                                        className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder={t('auth.placeholder_password')}
                                    value={formData.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="w-full h-14 rounded-2xl border-2 border-black/[0.06] bg-[#F8F7F3] px-5 text-[#122D28] placeholder:text-[#122D28]/20 font-bold text-base focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all"
                                />
                            </div>

                            <motion.button
                                id="login-submit-btn"
                                type="submit"
                                disabled={isLoading}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/25 transition-all disabled:opacity-60 flex items-center justify-center gap-3 mt-1"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>{t('auth.login')}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <div className="mt-8 text-center pt-6 border-t border-black/[0.06]">
                            <p className="text-[#122D28]/40 text-xs font-bold uppercase tracking-widest">
                                {t('auth.no_account')}
                                <button
                                    id="login-to-signup-link"
                                    type="button"
                                    onClick={() => navigate('/signup')}
                                    className="text-primary hover:text-primary/70 font-black ml-2 transition-all"
                                >
                                    {t('auth.signup')}
                                </button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
