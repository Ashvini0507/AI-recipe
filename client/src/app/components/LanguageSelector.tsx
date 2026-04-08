import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളம்' },
];

export const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const { changeLanguage: updateLanguageSync } = useApp();

    const changeLanguage = async (lng: string) => {
        i18n.changeLanguage(lng);
        await updateLanguageSync(lng);
    };

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-3 px-4 h-11 rounded-[1.25rem] bg-black/5 hover:bg-black/10 transition-all border border-black/5 hover:border-black/10 group">
                    <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground hidden sm:inline">{currentLanguage.nativeName}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-[2.5rem] shadow-2xl bg-white/95 backdrop-blur-3xl border-black/5 animate-in fade-in zoom-in duration-300">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all mb-1 last:mb-0 ${i18n.language === lang.code ? 'bg-primary/10 text-primary font-black shadow-lg shadow-primary/5 border border-primary/20' : 'text-muted-foreground hover:bg-black/5 hover:text-foreground'
                            }`}
                    >
                        <div className="flex flex-col">
                            <span className="text-xs font-bold tracking-tight">{lang.nativeName}</span>
                            <span className="text-[9px] opacity-40 uppercase tracking-[0.2em] font-black mt-0.5">{lang.name}</span>
                        </div>
                        {i18n.language === lang.code && (
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                <Check className="w-4 h-4 text-primary stroke-[3]" />
                            </motion.div>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
