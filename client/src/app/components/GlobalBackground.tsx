import React from 'react';
import { motion } from 'motion/react';

export const GlobalBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-white">
            {/* Mesh Gradients - Soft Emerald glows for warm Ivory Theme */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 45, 0],
                    x: [0, 30, 0],
                    y: [0, 20, 0]
                }}
                transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] bg-[#10B981]/20 rounded-full blur-[120px] opacity-40"
            />
            <motion.div 
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -45, 0],
                    x: [0, -30, 0],
                    y: [0, -20, 0]
                }}
                transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute top-[20%] -right-[5%] w-[45%] h-[45%] bg-[#F59E0B]/15 rounded-full blur-[100px] opacity-30"
            />
            <motion.div 
                animate={{ 
                    scale: [1, 1.4, 1],
                    x: [0, 60, 0],
                    y: [0, -30, 0]
                }}
                transition={{ 
                    duration: 35, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute -bottom-[5%] left-[15%] w-[35%] h-[35%] bg-[#10B981]/10 rounded-full blur-[140px] opacity-25"
            />

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ 
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>
        </div>
    );
};
