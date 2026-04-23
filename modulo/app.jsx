import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Server, ShieldAlert, Zap, CheckCircle2,
    AlertOctagon, TrendingUp, Building, MapPin,
    Briefcase, Network, Database, ChevronDown,
    Cpu, Thermometer, Radio, ArrowRight, Cloud, Lock, Eye,
    Menu, X, Activity, ActivitySquare, AlertTriangle
} from 'lucide-react';

// --- DATOS CONSERVADOS ---
const coverData = {
    institution: "Complejo Educativo “Thomas Jefferson”",
    module: "Módulo 3.3: Gestión y monitoreo de centros de datos",
    project: "Reporte de Infraestructura Tecnológica",
    teacher: "Inga. Lady Yamileth Morán",
    grade: "3° ITSI Sección: “A”",
    year: "2026",
    students: [
        "5. Erick Geovanny Cruz",
        "12. Diana Marlene Graciano",
        "14. Mario Alejandro Marroquín",
        "20. Alicia Beatriz Olivares",
        "30. Silvia Pilar Zacapa"
    ]
};

const companyData = {
    name: "Telemóvil El Salvador, S.A. de C.V (TIGO)",
    address: "Edificio Campus Tigo Tuscania Corporate Business Park, Vía del Corso, Zaragoza.",
    business: "Proveedor de telecomunicaciones. Proporciona banda ancha, datos móviles (5G/VoLTE) y servicios de llamadas.",
    interviewee: {
        name: "Yobani",
        role: "Ingeniero en Sistemas de Mediación",
        goal: "Determinar la importancia de la operación, el monitoreo y el cumplimiento de estándares internacionales (ISO) en la gestión de un centro de datos de alto rendimiento, para identificar las mejores prácticas de redundancia, seguridad y continuidad del negocio aplicadas en el sector de telecomunicaciones a través de la entrevista a un profesional experimentado."
    }
};

const analysisData = [
    {
        iso: "ISO/IEC 22237 (Infraestructura)",
        description: "Diseño, disponibilidad y topología física del centro de datos.",
        icon: <Server className="w-10 h-10" />,
        color: "blue",
        strengths: {
            title: "Diseño y Geografía",
            items: [
                "Diseño de Alta Disponibilidad (Tier 4): Operar bajo redundancia Nivel 4 permite mantenimiento simultáneo sin detener servicios.",
                "Distribución Geográfica Estratégica: Centros en La Cima, Escalón, Panamá y Honduras conectando con la fibra óptica del Atlántico."
            ],
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
        },
        weaknesses: {
            title: "Limitaciones Legacy",
            items: [
                "Lastre operativo por sistemas heredados (Legacy): Dependencia de sistemas antiguos como Oracle y DB2 con interfaces de terminal antigua.",
                "Cuellos de botella: Mantener bases de datos legacy en un Tier 4 aumenta la complejidad del mantenimiento."
            ],
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80"
        },
        recs: {
            title: "IA y Migración",
            items: [
                "Mantenimiento Predictivo con IA: Usar Machine Learning en el DCIM para predecir fallos eléctricos o térmicos.",
                "Retiro de DB2/Oracle: Priorizar la migración hacia Supabase y Trino para mejorar la agilidad del ecosistema."
            ],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        iso: "ISO 27001 (Seguridad)",
        description: "Detección de amenazas y evaluación de riesgos.",
        icon: <Zap className="w-10 h-10" />,
        color: "emerald",
        strengths: {
            title: "Medidas ya implementadas",
            items: [
                "Adopción segura de Inteligencia Artificial: Como mencionábamos se ha firmado un contrato con Microsoft para usar Copilot sin que se filtren datos de entrenamiento o información confidencial.",
                "•	Control de Acceso Estricto (VPN): Aunque puede representar un cuello de botella."
            ],
            image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80"
        },
        weaknesses: {
            title: "Riesgo Humano",
            items: [
                "Intervención humana en aprovisionamiento: Las decisiones iniciales dependen de personas, lo que retrasa la respuesta."
            ],
            image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
        },
        recs: {
            title: "Automatización Total",
            items: [
                "Reducción de RPO: Bajar el margen de pérdida de horas a segundos mediante replicación síncrona.",
                "Infraestructura como Código (IaC): Adoptar Terraform para respuesta automática."
            ],
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        iso: "ISO 22301 (Continuidad)",
        description: "Gestión de incidentes, respaldos y recuperación ante desastres.",
        icon: <Zap className="w-10 h-10" />,
        color: "emerald",
        strengths: {
            title: "Respaldo Granular",
            items: [
                "Políticas de Backup: Respaldos por horas, días, meses y años. Minimiza la pérdida de datos ante ataques.",
                "Escalamiento 5G Proactivo: Plan de ampliación continua de ancho de banda para soportar 5G."
            ],
            image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80"
        },
        weaknesses: {
            title: "Riesgo Humano",
            items: [
                "Intervención humana en aprovisionamiento: Las decisiones iniciales dependen de personas, lo que retrasa la respuesta."
            ],
            image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
        },
        recs: {
            title: "Automatización Total",
            items: [
                "Reducción de RPO: Bajar el margen de pérdida de horas a segundos mediante replicación síncrona.",
                "Infraestructura como Código (IaC): Adoptar Terraform para respuesta automática."
            ],
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
        }
    }
];

// --- COMPONENTES ---

const LogoTigo = ({ scrollYProgress }) => {
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-12 right-12 z-50 flex items-center gap-3 bg-slate-950/80 backdrop-blur-md p-2 pr-6 rounded-full border border-white/10 shadow-2xl"
        >
            <div className="w-12 h-12 bg-[#00377d] rounded-full flex items-center justify-center shadow-lg border border-blue-400/30">
                <span className="text-white font-black text-xl tracking-tighter">tigo</span>
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-widest uppercase">Business</span>
                <span className="text-blue-400 text-[10px] font-medium leading-none">Infrastructure Report</span>
            </div>
        </motion.div>
    );
};

const IdentifiedProblems = () => {
    const problems = [
        {
            title: "Migración a la Nube y Modernización",
            desc: "Desmantelamiento de sistemas legacy (Oracle y DB2) para transicionar hacia un stack moderno en la nube. Superar esta infraestructura heredada es clave para eliminar cuellos de botella técnicos.",
            icon: <Cloud className="w-10 h-10 text-rose-400 mb-6" />
        },
        {
            title: "Aumento de Volumen por 5G",
            desc: "El despliegue de 5G y VoLTE incrementa exponencialmente el volumen de datos. Esto exige un auto-escalamiento dinámico que choca actualmente con el requerimiento de aprovisionamiento manual.",
            icon: <Radio className="w-10 h-10 text-rose-400 mb-6" />
        },
        {
            title: "Rigurosidad en la Continuidad",
            desc: "En el sector crítico de las telecomunicaciones, la recuperación es severa. La concentración de riesgo en la virtualización y dependencias exigen blindar la resiliencia y recuperación operativa.",
            icon: <ShieldAlert className="w-10 h-10 text-rose-400 mb-6" />
        }
    ];

    return (
        <div className="mb-48">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold uppercase tracking-widest mb-6">
                    <AlertOctagon className="w-5 h-5" /> Contexto Operativo
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight italic">Retos Identificados</h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                    A partir de la evaluación de la infraestructura, se han detectado desafíos operativos y estratégicos cruciales para la modernización del centro de datos.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                {problems.map((prob, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        whileHover={{ y: -15, borderColor: 'rgba(244,63,94,0.4)' }}
                        className="bg-slate-900/40 p-10 rounded-[3rem] border border-rose-500/10 backdrop-blur-md shadow-2xl transition-colors group"
                    >
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="inline-block"
                        >
                            {prob.icon}
                        </motion.div>
                        <h3 className="text-2xl font-black text-white mb-4 leading-tight">{prob.title}</h3>
                        <p className="text-lg text-slate-400 leading-relaxed font-light">{prob.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- ARQUITECTURA VIVA (MEJORADA) ---
const ArchitectureSchema = () => {
    // Estados de simulación y métricas
    const [simMode, setSimMode] = useState('NORMAL'); // NORMAL o STRESS
    const [metrics, setMetrics] = useState({ load: 42, latency: 8, throughput: 84.5 });
    const [tick, setTick] = useState(0);
    const [logs, setLogs] = useState([]);

    // Ciclo de la arquitectura (Nodos)
    const sequence = ['onprem', 'ztna', 'aws', 'supabase', 'trino', 'python', 'terraform', 'dcim'];
    const activeNode = sequence[tick % sequence.length];

    // Configuraciones visuales según el modo
    const isStress = simMode === 'STRESS';
    const statusColor = isStress ? 'text-amber-400' : 'text-emerald-400';
    const statusBg = isStress ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30';
    const statusPing = isStress ? 'bg-amber-400' : 'bg-emerald-400';
    const statusDot = isStress ? 'bg-amber-500' : 'bg-emerald-500';

    // Función auxiliar para determinar opacidad/escala (Jerarquía visual)
    const getStyles = (nodeId) => ({
        opacity: activeNode === nodeId ? 1 : 0.5,
        scale: activeNode === nodeId ? 1.02 : 1,
        borderColor: activeNode === nodeId ? 'rgba(59,130,246,0.6)' : 'rgba(59,130,246,0.1)'
    });

    // 1. Orquestador de Eventos (Cambia el nodo activo)
    useEffect(() => {
        const intervalTime = isStress ? 1200 : 2000; // Más rápido en modo estrés
        const timer = setInterval(() => setTick(t => t + 1), intervalTime);
        return () => clearInterval(timer);
    }, [isStress]);

    // 2. Generador de Logs Sincronizados
    useEffect(() => {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0').slice(0, 2)}`;

        let logData = { text: '', status: '', color: '' };

        switch (activeNode) {
            case 'onprem': logData = { text: `Ingesta Batch CDR On-Premise [Tier 4]`, status: 'OK', color: 'text-blue-400' }; break;
            case 'ztna': logData = { text: `Evaluando políticas de identidad (Zero Trust)`, status: 'AUTH', color: 'text-emerald-400' }; break;
            case 'aws': logData = { text: isStress ? `⚠️ Activando Nodos Extra AWS Auto-scaling` : `AWS Cloud Sincronizado`, status: 'SYNC', color: isStress ? 'text-amber-400' : 'text-blue-400' }; break;
            case 'supabase': logData = { text: `Escritura transaccional distribuida Supabase`, status: 'WRITE', color: 'text-emerald-400' }; break;
            case 'trino': logData = { text: `Query federada Trino (${Math.round(metrics.latency)}ms)`, status: 'EXEC', color: 'text-emerald-400' }; break;
            case 'python': logData = { text: `Transformación pipeline Python: Mediación`, status: 'PROC', color: 'text-emerald-400' }; break;
            case 'terraform': logData = { text: `Validación de estado IaC Terraform`, status: 'CHK', color: 'text-slate-400' }; break;
            case 'dcim': logData = { text: `Análisis térmico IA: Temp ${Math.round(metrics.load + 15)}°C`, status: 'SAFE', color: 'text-blue-400' }; break;
        }

        const newLog = { id: Date.now(), time: timeStr, ...logData };
        setLogs(prev => [newLog, ...prev].slice(0, 4)); // Mantiene los últimos 4 logs
    }, [activeNode, isStress, metrics.latency, metrics.load]);

    // 3. Simulador de Métricas Dinámicas (Micro-variaciones realistas)
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => {
                const targetLoad = isStress ? 88 : 42;
                const targetLat = isStress ? 45 : 8;
                const targetThr = isStress ? 145 : 84.5;

                // Suavizado hacia el target + ruido aleatorio
                return {
                    load: prev.load + (targetLoad - prev.load) * 0.1 + (Math.random() * 4 - 2),
                    latency: prev.latency + (targetLat - prev.latency) * 0.15 + (Math.random() * 2 - 1),
                    throughput: prev.throughput + (targetThr - prev.throughput) * 0.1 + (Math.random() * 4 - 2)
                };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isStress]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-10 md:p-16 bg-slate-900/90 rounded-[4rem] border border-blue-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl"
        >
            {/* Animación de fondo continuo */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}>
                    <Network className="w-80 h-80 text-blue-400" />
                </motion.div>
            </div>

            {/* Cabecera del Dashboard interactiva */}
            <div className="relative z-10 text-center mb-16 flex flex-col items-center">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`inline-flex items-center justify-center gap-3 px-5 py-2 rounded-full border transition-colors duration-500 ${statusBg}`}>
                        <span className="relative flex h-2.5 w-2.5">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusPing}`}></span>
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusDot}`}></span>
                        </span>
                        <span className={`${statusColor} text-xs font-bold uppercase tracking-widest font-mono transition-colors duration-500`}>
                            {isStress ? 'Alta Carga (5G Picos)' : 'Sistema En Línea'}
                        </span>
                    </div>
                    {/* Botón Simulador */}
                    <button
                        onClick={() => setSimMode(m => m === 'NORMAL' ? 'STRESS' : 'NORMAL')}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${isStress ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500/30' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}
                    >
                        {isStress ? 'Restaurar Normalidad' : 'Simular Pico 5G'}
                    </button>
                </div>
                <h2 className="text-5xl font-black text-white mb-4 italic tracking-tight">Arquitectura Propuesta 2026</h2>
                <p className="text-blue-400 text-xl font-medium">Ecosistema de Datos de Próxima Generación</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 relative z-10">
                {/* --- CAPA DE CONSUMIDORES Y CONTROL --- */}
                <div className="flex flex-col gap-6">
                    <motion.div
                        animate={getStyles('dcim')} transition={{ duration: 0.4 }}
                        className="p-8 bg-slate-950/80 rounded-3xl border border-slate-800 border-l-8 border-l-blue-500 shadow-2xl relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Eye className={`w-8 h-8 ${activeNode === 'dcim' ? 'text-blue-400 animate-pulse' : 'text-slate-500'}`} />
                            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">Temp: {Math.round(metrics.load + 15)}°C</span>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">IA DCIM</h4>
                        <p className="text-sm text-slate-400">Monitoreo térmico y eléctrico predictivo.</p>
                    </motion.div>

                    <motion.div
                        animate={getStyles('ztna')} transition={{ duration: 0.4 }}
                        className="p-8 bg-slate-950/80 rounded-3xl border border-slate-800 border-l-8 border-l-emerald-500 shadow-2xl relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Lock className={`w-8 h-8 ${activeNode === 'ztna' ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Auth OK</span>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">Zero Trust</h4>
                        <p className="text-sm text-slate-400">Seguridad perimetral basada en identidad.</p>
                    </motion.div>
                </div>

                {/* --- CONECTOR DE DATOS (BUS ACTIVO) --- */}
                <div className="hidden lg:flex flex-col items-center justify-center w-full relative px-4">
                    {/* Canal superior: Telemetría (Derecha a Izquierda) */}
                    <div className="w-full relative mb-8">
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold uppercase mb-2">
                            <span className={activeNode === 'dcim' ? 'text-white' : ''}>Control</span>
                            <span className={activeNode === 'dcim' ? 'text-emerald-400' : ''}>Telemetría</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                                animate={{ x: ['300%', '-100%'] }}
                                transition={{ repeat: Infinity, duration: activeNode === 'dcim' ? 0.8 : 2, ease: "linear" }}
                                className={`w-1/3 h-full bg-gradient-to-l from-transparent ${activeNode === 'dcim' ? 'via-emerald-400' : 'via-slate-500'} to-transparent`}
                            />
                        </div>
                    </div>
                    {/* Canal inferior: Políticas (Izquierda a Derecha) */}
                    <div className="w-full relative">
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold uppercase mb-2">
                            <span className={activeNode === 'ztna' ? 'text-blue-400' : ''}>Políticas</span>
                            <span className={activeNode === 'ztna' ? 'text-white' : ''}>Infra</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                                animate={{ x: ['-100%', '300%'] }}
                                transition={{ repeat: Infinity, duration: activeNode === 'ztna' ? 0.8 : 1.5, ease: "linear", delay: 0.5 }}
                                className={`w-1/3 h-full bg-gradient-to-r from-transparent ${activeNode === 'ztna' ? 'via-blue-400' : 'via-slate-500'} to-transparent`}
                            />
                        </div>
                    </div>
                </div>

                {/* --- ORIGEN Y PROCESAMIENTO (HYBRID CORE) --- */}
                <div className="lg:col-span-2 bg-slate-950/90 p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col">
                    {/* Fondo dinámico de estrés */}
                    <motion.div
                        animate={{ opacity: isStress ? [0.1, 0.2, 0.1] : [0.02, 0.05, 0.02] }}
                        transition={{ repeat: Infinity, duration: isStress ? 1 : 4 }}
                        className={`absolute inset-0 bg-gradient-to-tr ${isStress ? 'from-amber-600/30 to-rose-600/30' : 'from-blue-600/20 to-emerald-600/20'} pointer-events-none transition-colors duration-1000`}
                    />

                    {/* Orígenes de Datos */}
                    <div className="grid grid-cols-2 gap-6 relative z-10">
                        {/* On-Premise */}
                        <motion.div
                            animate={getStyles('onprem')} transition={{ duration: 0.3 }}
                            className={`p-6 bg-slate-900/80 rounded-2xl border ${activeNode === 'onprem' ? 'border-blue-400/50' : 'border-slate-700/50'} text-center relative shadow-lg`}
                        >
                            <Building className={`mx-auto mb-3 w-7 h-7 transition-colors ${activeNode === 'onprem' ? 'text-blue-400' : 'text-slate-500'}`} />
                            <span className="text-sm font-bold text-white">On-Premise (Tier 4)</span>
                            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400">
                                <span>Lat: <span className={isStress ? 'text-amber-400' : 'text-emerald-400'}>{Math.round(metrics.latency)}ms</span></span>
                                <span>Up: <span className="text-emerald-400">99.9%</span></span>
                            </div>
                        </motion.div>

                        {/* AWS Cloud */}
                        <motion.div
                            animate={getStyles('aws')} transition={{ duration: 0.3 }}
                            className={`p-6 bg-slate-900/80 rounded-2xl border ${activeNode === 'aws' ? 'border-blue-400/50' : 'border-slate-700/50'} text-center relative shadow-lg`}
                        >
                            {isStress && (
                                <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded border border-amber-500/30">
                                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                                    <span className="text-[8px] font-mono text-amber-400 uppercase">Scale Out</span>
                                </div>
                            )}
                            <Cloud className={`mx-auto mb-3 w-7 h-7 transition-colors ${activeNode === 'aws' ? 'text-blue-400' : 'text-slate-500'}`} />
                            <span className="text-sm font-bold text-white">AWS Cloud</span>
                            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400">
                                <span>Load: <span className={isStress ? 'text-rose-400' : 'text-blue-400'}>{Math.round(metrics.load)}%</span></span>
                                <span>Nodes: <span className="text-slate-300">{isStress ? '12' : '4'}</span></span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Flujo descendente hacia Data Stack */}
                    <div className="flex justify-center my-4 relative h-8">
                        <div className="w-0.5 h-full bg-slate-800/50 relative overflow-hidden mx-12">
                            <motion.div animate={{ y: ['-100%', '300%'] }} transition={{ repeat: Infinity, duration: (activeNode === 'onprem' || activeNode === 'aws') ? 0.5 : 1.5, ease: "linear" }} className={`w-full h-1/2 bg-gradient-to-b from-transparent ${isStress ? 'to-amber-500' : 'to-emerald-500'} absolute`} />
                        </div>
                        <div className="w-0.5 h-full bg-slate-800/50 relative overflow-hidden mx-12">
                            <motion.div animate={{ y: ['300%', '-100%'] }} transition={{ repeat: Infinity, duration: activeNode === 'terraform' ? 0.5 : 1.5, ease: "linear", delay: 0.2 }} className="w-full h-1/2 bg-gradient-to-t from-transparent to-blue-500 absolute" />
                        </div>
                    </div>

                    {/* Modern Data Stack (Procesamiento) */}
                    <div className={`p-6 bg-[#0f172a] rounded-3xl border relative z-10 transition-colors duration-500 ${['supabase', 'trino', 'python', 'terraform'].includes(activeNode) ? 'border-emerald-500/40 shadow-[inset_0_2px_30px_rgba(16,185,129,0.1)]' : 'border-slate-800 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]'}`}>
                        <div className="flex justify-between items-center mb-4 border-b border-slate-800/80 pb-4">
                            <div className="flex items-center gap-3">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: isStress ? 2 : 5, ease: "linear" }}>
                                    <ActivitySquare className={`w-5 h-5 ${isStress ? 'text-amber-400' : 'text-emerald-400'}`} />
                                </motion.div>
                                <span className="text-xs uppercase font-black tracking-widest text-slate-300">Modern Data Stack</span>
                            </div>
                            <span className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${isStress ? 'text-amber-400 bg-amber-950/30 border-amber-500/20' : 'text-emerald-400 bg-emerald-950/30 border-emerald-500/20'}`}>
                                {(metrics.throughput).toFixed(1)} Gbps
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mb-5">
                            {[
                                { id: 'supabase', name: 'Supabase' },
                                { id: 'trino', name: 'Trino' },
                                { id: 'python', name: 'Python' },
                                { id: 'terraform', name: 'Terraform' }
                            ].map((tech) => {
                                const isActiveTech = activeNode === tech.id;
                                return (
                                    <motion.span
                                        key={tech.id}
                                        animate={{
                                            borderColor: isActiveTech ? 'rgba(52,211,153,0.8)' : 'rgba(255,255,255,0.05)',
                                            color: isActiveTech ? '#34d399' : '#cbd5e1',
                                            backgroundColor: isActiveTech ? 'rgba(52,211,153,0.1)' : '#0f172a'
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="px-4 py-1.5 rounded-lg text-xs font-bold border"
                                    >
                                        {tech.name}
                                    </motion.span>
                                )
                            })}
                        </div>

                        {/* Consola Simulada Sincronizada */}
                        <div className="bg-black/80 rounded-xl p-3 h-28 overflow-hidden relative border border-slate-800 font-mono text-[10px] shadow-inner flex flex-col justify-end">
                            <AnimatePresence>
                                {logs.map((log) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex gap-2 mb-1.5 opacity-90"
                                    >
                                        <span className="text-slate-600 shrink-0">[{log.time}]</span>
                                        <span className={`${log.color} shrink-0`}>[{log.status}]</span>
                                        <span className="text-slate-300 truncate">{log.text}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const HeroSection = () => {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            <LogoTigo scrollYProgress={scrollYProgress} />

            <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-slate-950"></div>
                <img
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80"
                    className="w-full h-full object-cover opacity-20 scale-110"
                    alt="Fondo Tecnológico"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-6 max-w-6xl mt-16"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10 inline-block p-4 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
                >
                    <span className="text-blue-400 font-black text-xl tracking-[0.3em] uppercase">Thomas Jefferson 2026</span>
                </motion.div>

                <motion.h1
                    className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight"
                >
                    Infraestructura <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Tigo El Salvador</span>
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-3xl text-slate-400 font-light mb-16 max-w-3xl mx-auto leading-relaxed"
                >
                    Análisis crítico de mediación de datos y cumplimiento de estándares Tier 4.
                </motion.p>

                <motion.div
                    className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto bg-slate-900/40 p-10 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-2xl"
                >
                    <div>
                        <p className="text-blue-400 text-sm font-black uppercase mb-4 tracking-widest">Información del Módulo</p>
                        <h3 className="text-white text-2xl font-bold mb-2">{coverData.module}</h3>
                        <p className="text-slate-400 text-lg italic">Docente: {coverData.teacher}</p>
                    </div>
                    <div className="md:border-l border-slate-800 md:pl-10">
                        <p className="text-emerald-400 text-sm font-black uppercase mb-4 tracking-widest">Equipo de Trabajo</p>
                        <div className="grid grid-cols-1 gap-2">
                            {coverData.students.map((s, i) => (
                                <p key={i} className="text-slate-300 text-sm font-medium tracking-wide">{s}</p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

const IsoCard = ({ data }) => (
    <div className="mb-48">
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16"
        >
            <div className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800 text-blue-400 shadow-xl">
                {data.icon}
            </div>
            <div>
                <h2 className="text-4xl font-black text-white italic tracking-tight">{data.iso}</h2>
                <p className="text-xl text-slate-500 mt-2">{data.description}</p>
            </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
            {/* FORTALEZA */}
            <motion.div
                whileHover={{ y: -15 }}
                className="bg-slate-900/60 rounded-[3.5rem] border border-emerald-500/20 overflow-hidden flex flex-col shadow-2xl group transition-all duration-500 hover:shadow-emerald-500/10"
            >
                <div className="h-64 relative overflow-hidden">
                    <img src={data.strengths.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fortaleza" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 bg-emerald-500 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">Fortaleza</div>
                </div>
                <div className="p-10 flex-1">
                    <h3 className="text-2xl font-black text-white mb-6 leading-tight">{data.strengths.title}</h3>
                    <ul className="space-y-4">
                        {data.strengths.items.map((it, i) => (
                            <li key={i} className="text-base text-slate-400 leading-relaxed flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                                <span>{it}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* DEBILIDAD */}
            <motion.div
                whileHover={{ y: -15 }}
                className="bg-slate-900/60 rounded-[3.5rem] border border-rose-500/20 overflow-hidden flex flex-col shadow-2xl group transition-all duration-500 hover:shadow-rose-500/10"
            >
                <div className="h-64 relative overflow-hidden">
                    <img src={data.weaknesses.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Debilidad" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 bg-rose-600 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">Debilidad</div>
                </div>
                <div className="p-10 flex-1">
                    <h3 className="text-2xl font-black text-white mb-6 leading-tight">{data.weaknesses.title}</h3>
                    <ul className="space-y-4">
                        {data.weaknesses.items.map((it, i) => (
                            <li key={i} className="text-base text-slate-400 leading-relaxed flex gap-3">
                                <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
                                <span>{it}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* RECOMENDACIÓN */}
            <motion.div
                whileHover={{ y: -15 }}
                className="bg-slate-900/60 rounded-[3.5rem] border border-blue-500/20 overflow-hidden flex flex-col shadow-2xl group transition-all duration-500 hover:shadow-blue-500/10"
            >
                <div className="h-64 relative overflow-hidden">
                    <img src={data.recs.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Recomendación" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 bg-blue-600 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">Estrategia</div>
                </div>
                <div className="p-10 flex-1">
                    <h3 className="text-2xl font-black text-white mb-6 leading-tight">{data.recs.title}</h3>
                    <div className="space-y-4">
                        {data.recs.items.map((it, i) => (
                            <div key={i} className="bg-slate-950/60 p-6 rounded-[2rem] border border-white/5 text-sm text-slate-300 leading-relaxed italic relative">
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full" />
                                {it}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

export default function App() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/40 font-sans">
            <HeroSection />

            <main className="py-32 px-6 max-w-[90rem] mx-auto">
                {/* RESUMEN EJECUTIVO */}
                <div className="grid lg:grid-cols-3 gap-10 mb-48">
                    <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm group">
                        <Building className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="text-white text-xl font-black mb-3 tracking-wide">Corporación</h4>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">{companyData.name}</p>
                        <p className="text-sm text-slate-600 mt-4 leading-relaxed">{companyData.address}</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm group">
                        <Cpu className="w-12 h-12 text-emerald-400 mb-6 group-hover:rotate-12 transition-transform" />
                        <h4 className="text-white text-xl font-black mb-3 tracking-wide">Consultoría Técnica</h4>
                        <p className="text-lg text-slate-200 font-bold leading-relaxed italic">Ing. {companyData.interviewee.name}</p>
                        <p className="text-base text-slate-500 leading-relaxed">{companyData.interviewee.role}</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm group">
                        <ShieldAlert className="w-12 h-12 text-emerald-400 mb-6 group-hover:animate-pulse" />
                        <h4 className="text-white text-xl font-black mb-3 tracking-wide">Certificación Objetivo</h4>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">Infraestructura Nivel 4 (ISO/IEC 22237)</p>
                        <p className="text-sm text-slate-600 mt-4 leading-relaxed">Disponibilidad del 99.995% anual.</p>
                    </motion.div>
                </div>

                {/* NUEVA SECCIÓN: PROBLEMA IDENTIFICADO */}
                <IdentifiedProblems />

                {/* CONTENIDO PRINCIPAL */}
                <div className="space-y-20">
                    {analysisData.map((data, i) => (
                        <IsoCard key={i} data={data} />
                    ))}
                </div>

                {/* ESQUEMA FINAL */}
                <ArchitectureSchema />

                {/* CIERRE DEL REPORTE */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center py-40 mt-20"
                >
                    <div className="inline-block px-8 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-10">
                        <span className="text-blue-400 font-black text-sm uppercase tracking-[0.4em]">Conclusión Ejecutiva</span>
                    </div>

                    <div className="max-w-5xl mx-auto relative">
                        <div className="absolute -top-10 -left-10 text-9xl text-slate-900 font-serif opacity-50">“</div>
                        <div className="bg-slate-900/20 p-16 rounded-[4rem] border border-white/5 backdrop-blur-md relative z-10 shadow-3xl">
                            <p className="text-2xl md:text-4xl text-slate-300 leading-relaxed font-light italic text-center">
                                La infraestructura de <span className="text-white font-black underline decoration-blue-500 decoration-4 underline-offset-8">Tigo El Salvador</span> evoluciona hacia una arquitectura híbrida donde la resiliencia del Tier 4 físico se potencia con la elasticidad de AWS. El éxito de esta transformación reside en el desmantelamiento de sistemas legacy y la adopción de una cultura de automatización basada en IA.
                            </p>
                        </div>
                        <div className="absolute -bottom-20 -right-10 text-9xl text-slate-900 font-serif opacity-50">”</div>
                    </div>
                </motion.div>
            </main>

            <footer className="bg-slate-950 py-32 text-center border-t border-white/5">
                <div className="mb-12 flex justify-center items-center gap-6">
                    <div className="w-16 h-16 bg-[#00377d] rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                        <span className="text-white font-black text-2xl tracking-tighter">tigo</span>
                    </div>
                    <div className="h-12 w-[2px] bg-slate-800" />
                    <div className="text-left">
                        <p className="text-white font-black text-lg tracking-widest uppercase">Thomas Jefferson</p>
                        <p className="text-slate-500 text-sm font-medium">ITSI — Módulo de Gestión de Datos</p>
                    </div>
                </div>
                <p className="text-xs text-slate-700 font-black tracking-[1em] uppercase">
                    El Salvador 2026
                </p>
            </footer>
        </div>
    );
}