import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Server, ShieldAlert, Zap, CheckCircle2,
  AlertOctagon, TrendingUp, Building, MapPin,
  Briefcase, Network, Database, ChevronDown,
  Cpu, Thermometer, Radio, ArrowRight, Cloud, Lock, Eye,
  Menu, X, Activity, ActivitySquare, AlertTriangle, HelpCircle,
  Camera
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
  business: "Proveedor de telecomunicaciones. Proporciona banda ancha, datos móviles (5G/VoLTE), centros de datos y servicios cloud.",
  interviewee: {
    name: "Yobani",
    role: "Ingeniero en Sistemas de Mediación",
    goal: "Determinar la importancia de la operación, monitoreo y cumplimiento ISO en un centro de datos de alto rendimiento."
  }
};

const analysisData = [
  {
    iso: "ISO/IEC 22237 (Infraestructura)",
    description: "Diseño, disponibilidad y topología física del centro de datos.",
    icon: Server,
    color: "blue",
    strengths: {
      title: "Diseño y Geografía",
      items: [
        "Diseño de Alta Disponibilidad (Tier 4): Operar bajo una clasificación de redundancia Nivel 4 es la mayor fortaleza de infraestructura posible. Esto significa que tienen tolerancia a fallos en todos los componentes físicos (energía, enfriamiento, red), permitiendo mantenimiento simultáneo sin detener los servicios de telecomunicaciones.",
        "Distribución Geográfica Estratégica: No dependen de una sola ubicación. Tienen centros propios locales (La Cima, Escalón), expansión regional inteligente (Panamá y Honduras para conectar directamente con la fibra óptica del Atlántico) y un entorno híbrido con la nube (AWS). Esta arquitectura distribuida reduce drásticamente la latencia y la dependencia de un solo punto físico."
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    },
    weaknesses: {
      title: "Limitaciones Legacy",
      items: [
        "Lastre operativo por sistemas heredados (Legacy): Aunque están migrando a soluciones open-source, la empresa todavía depende de sistemas antiguos y costosos como Oracle y DB2 (este último con interfaces de terminal antigua). Mantener bases de datos legacy en una arquitectura de alta disponibilidad Tier 4 crea cuellos de botella en la integración y aumenta la complejidad del mantenimiento de la infraestructura."
      ],
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80"
    },
    recs: {
      title: "IA y Migración",
      items: [
        "Mantenimiento Predictivo impulsado por IA: Ya que están utilizando IA en el área de desarrollo (Copilot), se recomienda expandir el uso de Machine Learning hacia la herramienta de monitoreo (DCIM). Esto permitirá analizar el comportamiento térmico y eléctrico para predecir el 'quemado de tarjetas' o 'corrupción de discos' semanas antes de que ocurran, permitiendo reemplazos programados y evitando el modo 'apagafuegos'.",
        "Acelerar el retiro de sistemas Legacy: Se debe priorizar la ruta de migración de los sistemas antiguos (DB2, Oracle) hacia el nuevo stack de bases de datos distribuidas (Supabase, Trino). Los sistemas heredados no están diseñados para la agilidad de un Tier 4 moderno y dificultan el mantenimiento simultáneo."
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    iso: "ISO 22301 (Continuidad)",
    description: "Gestión de incidentes, respaldos y recuperación ante desastres.",
    icon: Zap,
    color: "emerald",
    strengths: {
      title: "Respaldo Granular",
      items: [
        "Políticas de Backup Altamente Granulares: La empresa maneja respaldos por horas, días, meses y años. Esta granularidad es el pilar de un buen Plan de Recuperación ante Desastres (DRP). Ante un ataque de ransomware o una corrupción masiva de datos, tener 'fotos' del sistema tomadas hace apenas una hora minimiza la pérdida de datos y acelera la recuperación.",
        "Preparación Proactiva para Escalamiento (5G): En lugar de esperar a que la red colapse, tienen un plan activo de 'ampliación continua de infraestructura' (ancho de banda, almacenamiento y memoria) para soportar el cambio drástico de velocidad que exige el 5G y VoLTE (pasar de descargas de 3 horas a 3 segundos)."
      ],
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80"
    },
    weaknesses: {
      title: "Riesgo Humano",
      items: [
        "Intervención humana en procesos base: Aunque tienen mucho automatizado, las decisiones de 'aprovisionamiento inicial' siguen requiriendo intervención humana. En un entorno que exige auto-escalamiento por picos de tráfico repentinos de 5G, depender de humanos para aprovisionar puede retrasar la respuesta ante crisis."
      ],
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
    },
    recs: {
      title: "Automatización Total",
      items: [
        "Reducción agresiva del RPO (Punto de Recuperación): Es imperativo reducir el margen de pérdida de datos aceptable de 5 horas a nivel de minutos o segundos. Se recomienda implementar replicación síncrona o clústeres activo-activo para las bases de datos transaccionales críticas (saldos prepago, llamadas en curso), garantizando que una falla no genere un impacto masivo en los usuarios.",
        "Transición a Infraestructura como Código (IaC): Para eliminar la debilidad de la 'intervención humana en el aprovisionamiento inicial', se recomienda adoptar herramientas como Terraform o Ansible. Esto permitirá que la infraestructura responda de forma verdaderamente dinámica y automática ante los picos súbitos de tráfico generados por la red 5G."
      ],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    iso: "ISO/IEC 27001 (Seguridad)",
    description: "Sistemas de gestión de seguridad de la información y accesos.",
    icon: ShieldAlert,
    color: "red",
    strengths: {
      title: "IA Segura y Control Lógico",
      items: [
        "Adopción Segura de Inteligencia Artificial: El uso de Microsoft Copilot bajo un entorno empresarial controlado es una fortaleza de cumplimiento. Garantiza que los ingenieros puedan usar IA para agilizar su trabajo (como análisis de código o logs) sin que la información confidencial de la empresa alimente modelos públicos, evitando fugas de datos.",
        "Control de Acceso Estricto (VPN): Aunque operativamente puede ser un cuello de botella, desde la perspectiva de auditoría de seguridad, exigir obligatoriamente una VPN para que el personal remoto acceda a los servidores asegura que el perímetro de la red corporativa se mantenga cerrado y el tráfico esté cifrado.",
        "Evaluación de Riesgos: Existe un departamento dedicado al análisis de amenazas y evaluación de riesgos, lo que permite la detección de fallas temprana y la creación de planes que permitan la continuidad del negocio."
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
    },
    weaknesses: {
      title: "Puntos Únicos de Fallo",
      items: [
        "Concentración de riesgo en virtualización: Se destaca que la mayoría de los servidores son virtuales y que alojan 'contenedores con hasta 25 servidores virtuales simultáneos'. El mismo entrevistado admite que esto representa un 'riesgo mayor' al ser aplicaciones simulando sistemas operativos. Si un nodo físico o el hipervisor se ve comprometido o falla, el impacto en cadena es altísimo.",
        "Dependencia absoluta de la VPN como punto único de fallo lógico: La conexión a equipos de red y servidores es 'imposible' sin una VPN activa. Si bien esto es una buena práctica de seguridad inicial, si el servicio de VPN sufre un ataque de denegación de servicio (DDoS) o una caída, los administradores remotos perderían totalmente la capacidad de gestionar el centro de datos durante una emergencia."
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    recs: {
      title: "Zero Trust y Descentralización",
      items: [
        "Evolucionar de VPN a Zero Trust Network Access (ZTNA): Dado que la VPN actual representa un único punto de fallo lógico, se recomienda implementar una arquitectura Zero Trust (Confianza Cero). Esto permite a los técnicos remotos acceder a aplicaciones específicas basándose en su identidad y contexto, sin necesidad de abrir un túnel general hacia toda la red corporativa, reduciendo la superficie de ataque.",
        "Descentralización del riesgo en la virtualización: Para mitigar el peligro de tener 'hasta 25 servidores virtuales' en un solo contenedor o nodo, se sugiere aplicar políticas de Anti-Afinidad en Kubernetes o en el hipervisor. Esto asegura que las cargas críticas se distribuyan físicamente en diferentes racks o servidores.",
        "Optimizar la Seguridad en Virtualización: Implementar medidas adicionales de aislamiento para los contenedores que albergan múltiples servidores virtuales, reduciendo la vulnerabilidad de 'punto único de falla'."
      ],
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    iso: "ISO/IEC 30134 (Eficiencia y PUE)",
    description: "Indicadores clave de rendimiento (KPIs) y eficiencia técnica.",
    icon: TrendingUp,
    color: "purple",
    strengths: {
      title: "Optimización de Datos",
      items: [
        "Migración Activa a Tecnologías Open-Source y Cloud: La transición hacia herramientas como Python, Trino, Supabase y la nube de AWS es excelente para la eficiencia. Al migrar a la nube y usar herramientas modernas, la empresa puede aprovechar el aprovisionamiento bajo demanda, lo que indirectamente mejora la eficiencia energética (PUE).",
        "Optimización de Procesamiento de Datos: El rol en 'sistemas de mediación' (transformar datos crudos a procesados) significa que están limpiando y estructurando la información antes de almacenarla permanentemente. Esto reduce el espacio de almacenamiento innecesario, optimizando el uso de los discos duros y reduciendo el consumo energético de los servidores."
      ],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
    },
    weaknesses: {
      title: "Impacto Térmico y Carga",
      items: [
        "Impacto no mitigado por el volumen de la red 5G y VoLTE: El despliegue está obligando a la empresa a realizar una 'ampliación continua de infraestructura'. Añadir hardware bruto constantemente impactará negativamente el PUE (Efectividad del Uso de Energía), consumirán más electricidad y requerirán mayor enfriamiento físico, sin que se evidencie una estrategia de optimización térmica clara.",
        "Limitaciones de VoLTE: La tecnología de voz sobre LTE no es soportada por todos los dispositivos de los clientes, lo que segmenta la calidad del servicio para usuarios con terminales antiguos."
      ],
      image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=800&q=80"
    },
    recs: {
      title: "Escalado Inteligente",
      items: [
        "Implementar políticas de 'Scale-to-Zero' (Apagado Dinámico): Para contrarrestar el alto consumo energético que traerá la expansión de hardware para 5G, se recomienda configurar el orquestador de contenedores para que 'apague' (destruya) los servidores virtuales que no se estén utilizando durante las horas de bajo tráfico (madrugada). Menos servidores encendidos mejoran drásticamente el PUE.",
        "Preparación para el Volumen 5G: Incrementar preventivamente la capacidad de almacenamiento y memoria, ya que se prevé que el 5G disparará el volumen de transacciones y la velocidad de consumo de datos.",
        "Gestión de ciclo de vida de los datos masivos: Ante el volumen 'demasiado grande' de datos del 5G, se recomienda establecer políticas estrictas de archivado en almacenamiento 'en frío' (Cold Storage en AWS, por ejemplo) para los datos que ya pasaron por el pre-procesamiento de mediación."
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    }
  }
];

// --- FUNCIONES DE FORMATEO DE TEXTO ---
function formatTextLine(text) {
  const match = text.match(/^([^:]+):(.*)$/);
  if (match) {
    return (
      <span className="inline">
        <strong className="text-white font-bold">{match[1]}:</strong>
        <span className="text-slate-300 font-light">{match[2]}</span>
      </span>
    );
  }
  return <span className="text-slate-300 font-light">{text}</span>;
}

// --- COMPONENTES ---

function LogoTigo({ scrollYProgress }) {
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
}

// COMPONENTE NUEVO: Evidencia de Entrevista (Foto)
function InterviewEvidence() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-32 flex flex-col items-center"
    >
      <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-10">
        <Camera className="w-5 h-5" /> Evidencia de Entrevista
      </div>

      <div className="w-full max-w-5xl bg-slate-900/40 p-4 md:p-6 rounded-[3.5rem] border border-white/5 backdrop-blur-md shadow-2xl relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-[3.5rem] pointer-events-none"></div>
        <div className="overflow-hidden rounded-[2.5rem]">
          <img
            src="img.jpeg"
            alt="Captura de pantalla de la entrevista por Zoom con el Ing. Yobani Zuniga"
            className="w-full h-auto object-cover border border-white/10 shadow-lg transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80';
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function InterviewQuestions() {
  const questions = [
    "¿Para qué empresa labora y qué rol desempeña?",
    "¿Cuál es su cargo y qué funciones técnicas desempeña?",
    "¿El centro de datos es propio o tercerizado?",
    "¿Qué rol cumple el centro de datos en los servicios que experimentan los clientes, como al hacer una recarga?",
    "¿Bajo qué nivel de Tier y esquema de redundancia (N, N+1, 2N+1) opera la infraestructura?",
    "¿Cómo funciona la automatización del auto-scaling ante incrementos súbitos de tráfico?",
    "¿Qué sistemas o software de monitoreo se utilizan para supervisar tanto la infraestructura física como las aplicaciones?",
    "¿Qué lenguajes de programación y herramientas de software conforman el stack tecnológico de su área?",
    "¿Cuál es la herramienta principal o más crítica dentro de su operación y por qué se considera de esa manera?",
    "¿Se han implementado procesos automatizados específicamente para evitar errores humanos y cómo funciona el sistema de notificaciones ante fallas?",
    "¿Existen procesos para identificar riesgos y gestionar la seguridad de los datos (basados en normas como la ISO 27001)?",
    "¿Cómo se gestiona la seguridad física en los centros de datos y cuál es el proceso para habilitar un nuevo servidor de forma segura?",
    "¿Ha tenido que solventar alguna falla crítica a lo largo de su experiencia y cómo es el proceso de recuperación?",
    "¿Qué riesgos tecnológicos se prevén para los próximos años y cómo se prepara la organización ante ellos (específicamente en IA y 5G)?",
    "¿Cómo se coordina la respuesta técnica ante incidentes y cómo garantizan la atención operativa las 24 horas del día?",
    "¿Qué proceso manual con intervención física priorizaría automatizar?",
    "¿Qué implementaciones de Inteligencia Artificial utilizan actualmente en sus flujos de trabajo?",
    "¿En algún momento se ha utilizado SQL?",
    "¿Podríamos decir que el sistema Prepago y Pospago es análogo a las tarjetas de débito y crédito?",
    "¿Qué es el data Warehouse?"
  ];

  return (
    <div className="mb-48">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold uppercase tracking-widest mb-6">
          <HelpCircle className="w-5 h-5" /> Guía de Investigación
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight italic">Preguntas de la Entrevista</h2>
        <p className="text-xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed">
          Cuestionario base formulado al ingeniero especialista para recopilar los datos operativos, técnicos y estratégicos que fundamentan este reporte.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 10) * 0.05 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
            className="flex items-start gap-5 p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-all shadow-lg group"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold text-lg shrink-0 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
              {i + 1}
            </span>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">{q}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IdentifiedProblems() {
  const problems = [
    {
      title: "Migración a la Nube y Modernización",
      desc: "Desmantelamiento de sistemas legacy (Oracle y DB2) para transicionar hacia un stack moderno en la nube. Superar esta infraestructura heredada es clave para eliminar cuellos de botella técnicos.",
      icon: Cloud
    },
    {
      title: "Aumento de Volumen por 5G",
      desc: "El despliegue de 5G y VoLTE incrementa exponencialmente el volumen de datos. Esto exige un auto-escalamiento dinámico que choca actualmente con el requerimiento de aprovisionamiento manual.",
      icon: Radio
    },
    {
      title: "Rigurosidad en la Continuidad",
      desc: "En el sector crítico de las telecomunicaciones, la recuperación es severa. La concentración de riesgo en la virtualización y dependencias exigen blindar la resiliencia y recuperación operativa.",
      icon: ShieldAlert
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
        <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed">
          A partir de la evaluación de la infraestructura, se han detectado desafíos operativos y estratégicos cruciales para la modernización del centro de datos.
        </p>
      </motion.div>

      <div className="grid xl:grid-cols-3 gap-10">
        {problems.map((prob, i) => {
          const IconComp = prob.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -15, borderColor: 'rgba(244,63,94,0.4)' }}
              className="bg-slate-900/40 p-12 rounded-[3rem] border border-rose-500/10 backdrop-blur-md shadow-2xl transition-colors group flex flex-col"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="inline-block"
              >
                <IconComp className="w-12 h-12 text-rose-400 mb-6" />
              </motion.div>
              <h3 className="text-3xl font-black text-white mb-6 leading-tight">{prob.title}</h3>
              <p className="text-xl text-slate-400 leading-relaxed font-light">{prob.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ArchitectureSchema() {
  const [simMode, setSimMode] = useState('NORMAL');
  const [metrics, setMetrics] = useState({ load: 42, latency: 8, throughput: 84.5 });
  const [tick, setTick] = useState(0);
  const [logs, setLogs] = useState([]);

  const sequence = ['onprem', 'ztna', 'aws', 'supabase', 'trino', 'python', 'terraform', 'dcim'];
  const activeNode = sequence[tick % sequence.length];

  const isStress = simMode === 'STRESS';
  const statusColor = isStress ? 'text-amber-400' : 'text-emerald-400';
  const statusBg = isStress ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30';
  const statusPing = isStress ? 'bg-amber-400' : 'bg-emerald-400';
  const statusDot = isStress ? 'bg-amber-500' : 'bg-emerald-500';

  const getStyles = (nodeId) => ({
    opacity: activeNode === nodeId ? 1 : 0.5,
    scale: activeNode === nodeId ? 1.02 : 1,
    borderColor: activeNode === nodeId ? 'rgba(59,130,246,0.6)' : 'rgba(59,130,246,0.1)'
  });

  useEffect(() => {
    const intervalTime = isStress ? 1200 : 2000;
    const timer = setInterval(() => setTick(t => t + 1), intervalTime);
    return () => clearInterval(timer);
  }, [isStress]);

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
    setLogs(prev => [newLog, ...prev].slice(0, 4));
  }, [activeNode, isStress, metrics.latency, metrics.load]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const targetLoad = isStress ? 88 : 42;
        const targetLat = isStress ? 45 : 8;
        const targetThr = isStress ? 145 : 84.5;

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
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}>
          <Network className="w-80 h-80 text-blue-400" />
        </motion.div>
      </div>

      <div className="relative z-10 text-center mb-16 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <div className={`inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border transition-colors duration-500 ${statusBg}`}>
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusPing}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${statusDot}`}></span>
            </span>
            <span className={`${statusColor} text-sm font-bold uppercase tracking-widest font-mono transition-colors duration-500`}>
              {isStress ? 'Alta Carga (5G Picos)' : 'Sistema En Línea'}
            </span>
          </div>
          <button
            onClick={() => setSimMode(m => m === 'NORMAL' ? 'STRESS' : 'NORMAL')}
            className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide border transition-all ${isStress ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500/30' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}
          >
            {isStress ? 'Restaurar Normalidad' : 'Simular Pico 5G'}
          </button>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-4 italic tracking-tight">Arquitectura Propuesta 2026</h2>
        <p className="text-blue-400 text-2xl font-medium">Ecosistema de Datos de Próxima Generación</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 relative z-10">
        <div className="flex flex-col gap-8">
          <motion.div
            animate={getStyles('dcim')} transition={{ duration: 0.4 }}
            className="p-10 bg-slate-950/80 rounded-3xl border border-slate-800 border-l-8 border-l-blue-500 shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <Eye className={`w-10 h-10 ${activeNode === 'dcim' ? 'text-blue-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md">Temp: {Math.round(metrics.load + 15)}°C</span>
            </div>
            <h4 className="text-white font-bold text-xl mb-2">IA DCIM</h4>
            <p className="text-base text-slate-400">Monitoreo térmico y eléctrico predictivo.</p>
          </motion.div>

          <motion.div
            animate={getStyles('ztna')} transition={{ duration: 0.4 }}
            className="p-10 bg-slate-950/80 rounded-3xl border border-slate-800 border-l-8 border-l-emerald-500 shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <Lock className={`w-10 h-10 ${activeNode === 'ztna' ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-md">Auth OK</span>
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Zero Trust</h4>
            <p className="text-base text-slate-400">Seguridad perimetral basada en identidad.</p>
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center w-full relative px-6">
          <div className="w-full relative mb-12">
            <div className="flex justify-between text-xs font-mono text-slate-500 font-bold uppercase mb-3">
              <span className={activeNode === 'dcim' ? 'text-white' : ''}>Control</span>
              <span className={activeNode === 'dcim' ? 'text-emerald-400' : ''}>Telemetría</span>
            </div>
            <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
              <motion.div
                animate={{ x: ['300%', '-100%'] }}
                transition={{ repeat: Infinity, duration: activeNode === 'dcim' ? 0.8 : 2, ease: "linear" }}
                className={`w-1/3 h-full bg-gradient-to-l from-transparent ${activeNode === 'dcim' ? 'via-emerald-400' : 'via-slate-500'} to-transparent`}
              />
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex justify-between text-xs font-mono text-slate-500 font-bold uppercase mb-3">
              <span className={activeNode === 'ztna' ? 'text-blue-400' : ''}>Políticas</span>
              <span className={activeNode === 'ztna' ? 'text-white' : ''}>Infra</span>
            </div>
            <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
              <motion.div
                animate={{ x: ['-100%', '300%'] }}
                transition={{ repeat: Infinity, duration: activeNode === 'ztna' ? 0.8 : 1.5, ease: "linear", delay: 0.5 }}
                className={`w-1/3 h-full bg-gradient-to-r from-transparent ${activeNode === 'ztna' ? 'via-blue-400' : 'via-slate-500'} to-transparent`}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950/90 p-10 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col">
          <motion.div
            animate={{ opacity: isStress ? [0.1, 0.2, 0.1] : [0.02, 0.05, 0.02] }}
            transition={{ repeat: Infinity, duration: isStress ? 1 : 4 }}
            className={`absolute inset-0 bg-gradient-to-tr ${isStress ? 'from-amber-600/30 to-rose-600/30' : 'from-blue-600/20 to-emerald-600/20'} pointer-events-none transition-colors duration-1000`}
          />

          <div className="grid grid-cols-2 gap-8 relative z-10">
            <motion.div
              animate={getStyles('onprem')} transition={{ duration: 0.3 }}
              className={`p-8 bg-slate-900/80 rounded-[2rem] border ${activeNode === 'onprem' ? 'border-blue-400/50' : 'border-slate-700/50'} text-center relative shadow-lg`}
            >
              <Building className={`mx-auto mb-4 w-10 h-10 transition-colors ${activeNode === 'onprem' ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className="text-lg font-bold text-white">On-Premise (Tier 4)</span>
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400">
                <span>Lat: <span className={isStress ? 'text-amber-400' : 'text-emerald-400'}>{Math.round(metrics.latency)}ms</span></span>
                <span>Up: <span className="text-emerald-400">99.9%</span></span>
              </div>
            </motion.div>

            <motion.div
              animate={getStyles('aws')} transition={{ duration: 0.3 }}
              className={`p-8 bg-slate-900/80 rounded-[2rem] border ${activeNode === 'aws' ? 'border-blue-400/50' : 'border-slate-700/50'} text-center relative shadow-lg`}
            >
              {isStress && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Scale Out</span>
                </div>
              )}
              <Cloud className={`mx-auto mb-4 w-10 h-10 transition-colors ${activeNode === 'aws' ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className="text-lg font-bold text-white">AWS Cloud</span>
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400">
                <span>Load: <span className={isStress ? 'text-rose-400' : 'text-blue-400'}>{Math.round(metrics.load)}%</span></span>
                <span>Nodes: <span className="text-slate-300">{isStress ? '12' : '4'}</span></span>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center my-6 relative h-12">
            <div className="w-1 h-full bg-slate-800/50 relative overflow-hidden mx-16">
              <motion.div animate={{ y: ['-100%', '300%'] }} transition={{ repeat: Infinity, duration: (activeNode === 'onprem' || activeNode === 'aws') ? 0.5 : 1.5, ease: "linear" }} className={`w-full h-1/2 bg-gradient-to-b from-transparent ${isStress ? 'to-amber-500' : 'to-emerald-500'} absolute`} />
            </div>
            <div className="w-1 h-full bg-slate-800/50 relative overflow-hidden mx-16">
              <motion.div animate={{ y: ['300%', '-100%'] }} transition={{ repeat: Infinity, duration: activeNode === 'terraform' ? 0.5 : 1.5, ease: "linear", delay: 0.2 }} className="w-full h-1/2 bg-gradient-to-t from-transparent to-blue-500 absolute" />
            </div>
          </div>

          <div className={`p-8 bg-[#0f172a] rounded-[2.5rem] border relative z-10 transition-colors duration-500 ${['supabase', 'trino', 'python', 'terraform'].includes(activeNode) ? 'border-emerald-500/40 shadow-[inset_0_2px_40px_rgba(16,185,129,0.15)]' : 'border-slate-800 shadow-[inset_0_2px_30px_rgba(0,0,0,0.5)]'}`}>
            <div className="flex justify-between items-center mb-6 border-b border-slate-800/80 pb-5">
              <div className="flex items-center gap-4">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: isStress ? 2 : 5, ease: "linear" }}>
                  <ActivitySquare className={`w-8 h-8 ${isStress ? 'text-amber-400' : 'text-emerald-400'}`} />
                </motion.div>
                <span className="text-base uppercase font-black tracking-widest text-slate-300">Modern Data Stack</span>
              </div>
              <span className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${isStress ? 'text-amber-400 bg-amber-950/30 border-amber-500/20' : 'text-emerald-400 bg-emerald-950/30 border-emerald-500/20'}`}>
                {(metrics.throughput).toFixed(1)} Gbps
              </span>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-6">
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
                    className="px-5 py-2.5 rounded-xl text-sm font-bold border"
                  >
                    {tech.name}
                  </motion.span>
                )
              })}
            </div>

            <div className="bg-black/80 rounded-2xl p-5 h-36 overflow-hidden relative border border-slate-800 font-mono text-xs shadow-inner flex flex-col justify-end">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-3 mb-2 opacity-90"
                  >
                    <span className="text-slate-600 shrink-0">[{log.time}]</span>
                    <span className={`${log.color} font-bold shrink-0`}>[{log.status}]</span>
                    <span className="text-slate-300 truncate">{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <LogoTigo scrollYProgress={scrollYProgress} />

      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-slate-950/80 to-slate-950 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-40 scale-110"
          alt="Fondo Tecnológico"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-20 text-center px-6 max-w-7xl mt-16"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 inline-block p-4 px-8 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl"
        >
          <span className="text-blue-400 font-black text-xl tracking-[0.4em] uppercase">Thomas Jefferson 2026</span>
        </motion.div>

        <motion.h1
          className="text-7xl md:text-[7rem] font-black text-white mb-10 leading-[1.05] tracking-tight"
        >
          Infraestructura <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Tigo El Salvador</span>
        </motion.h1>

        <motion.p
          className="text-2xl md:text-4xl text-slate-400 font-light mb-20 max-w-4xl mx-auto leading-relaxed"
        >
          Análisis crítico de mediación de datos y cumplimiento de estándares Tier 4.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-10 text-left max-w-5xl mx-auto bg-slate-900/50 p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-2xl shadow-3xl"
        >
          <div>
            <p className="text-blue-400 text-base font-black uppercase mb-5 tracking-widest">Información del Módulo</p>
            <h3 className="text-white text-3xl font-bold mb-3">{coverData.module}</h3>
            <p className="text-slate-400 text-xl italic">Docente: {coverData.teacher}</p>
          </div>
          <div className="md:border-l-2 border-slate-800 md:pl-12">
            <p className="text-emerald-400 text-base font-black uppercase mb-5 tracking-widest">Equipo de Trabajo</p>
            <div className="grid grid-cols-1 gap-3">
              {coverData.students.map((s, i) => (
                <p key={i} className="text-slate-300 text-lg font-medium tracking-wide">{s}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function IsoCard({ data }) {
  const IconComp = data.icon;
  return (
    <div className="mb-56 w-full">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-8 mb-16"
      >
        <div className="p-6 md:p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 text-blue-400 shadow-2xl shrink-0">
          <IconComp className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight">{data.iso}</h2>
          <p className="text-xl md:text-2xl text-slate-500 mt-2 md:mt-4 font-light">{data.description}</p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-10">
        {/* FORTALEZA */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="grid grid-cols-1 xl:grid-cols-12 bg-slate-900/60 rounded-[3rem] border border-emerald-500/20 overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-emerald-500/10 w-full"
        >
          <div className="xl:col-span-4 relative min-h-[300px] xl:min-h-full overflow-hidden">
            <img src={data.strengths.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fortaleza" />
            <div className="absolute inset-0 bg-gradient-to-t xl:bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-8 left-10 bg-emerald-500 text-white text-sm font-black px-6 py-2.5 rounded-full uppercase tracking-widest shadow-xl">Fortaleza</div>
          </div>
          <div className="xl:col-span-8 p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-black text-white mb-8 leading-tight">{data.strengths.title}</h3>
            <ul className="space-y-6">
              {data.strengths.items.map((it, i) => (
                <li key={i} className="text-lg text-slate-300 leading-relaxed flex items-start gap-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0 mt-1" />
                  <div>{formatTextLine(it)}</div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* DEBILIDAD */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="grid grid-cols-1 xl:grid-cols-12 bg-slate-900/60 rounded-[3rem] border border-rose-500/20 overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-rose-500/10 w-full"
        >
          <div className="xl:col-span-4 xl:order-last relative min-h-[300px] xl:min-h-full overflow-hidden">
            <img src={data.weaknesses.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Debilidad" />
            <div className="absolute inset-0 bg-gradient-to-t xl:bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-8 left-10 xl:bottom-auto xl:top-10 xl:right-10 bg-rose-600 text-white text-sm font-black px-6 py-2.5 rounded-full uppercase tracking-widest shadow-xl">Debilidad</div>
          </div>
          <div className="xl:col-span-8 p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-black text-white mb-8 leading-tight">{data.weaknesses.title}</h3>
            <ul className="space-y-6">
              {data.weaknesses.items.map((it, i) => (
                <li key={i} className="text-lg text-slate-300 leading-relaxed flex items-start gap-4">
                  <AlertOctagon className="w-7 h-7 text-rose-500 shrink-0 mt-1" />
                  <div>{formatTextLine(it)}</div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* RECOMENDACIÓN */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="grid grid-cols-1 xl:grid-cols-12 bg-slate-900/60 rounded-[3rem] border border-blue-500/20 overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-blue-500/10 w-full"
        >
          <div className="xl:col-span-4 relative min-h-[300px] xl:min-h-full overflow-hidden">
            <img src={data.recs.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Recomendación" />
            <div className="absolute inset-0 bg-gradient-to-t xl:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-8 left-10 bg-blue-600 text-white text-sm font-black px-6 py-2.5 rounded-full uppercase tracking-widest shadow-xl">Estrategia</div>
          </div>
          <div className="xl:col-span-8 p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-black text-white mb-8 leading-tight">{data.recs.title}</h3>
            <div className="space-y-6">
              {data.recs.items.map((it, i) => (
                <div key={i} className="bg-slate-950/60 p-8 rounded-[2rem] border border-white/5 text-lg text-slate-300 leading-relaxed relative flex items-start">
                  <div className="absolute -left-2 top-8 w-1.5 h-10 bg-blue-500 rounded-full" />
                  <div>{formatTextLine(it)}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/40 font-sans">
      <HeroSection />

      <main className="py-40 px-6 max-w-full lg:px-16 mx-auto">
        {/* RESUMEN EJECUTIVO */}
        <div className="grid lg:grid-cols-3 gap-12 mb-56">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-md group shadow-2xl">
            <Building className="w-16 h-16 text-blue-400 mb-8 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-2xl font-black mb-4 tracking-wide">Corporación</h4>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">{companyData.name}</p>
            <p className="text-lg text-slate-500 mt-5 leading-relaxed">{companyData.address}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-md group shadow-2xl">
            <Cpu className="w-16 h-16 text-emerald-400 mb-8 group-hover:rotate-12 transition-transform" />
            <h4 className="text-white text-2xl font-black mb-4 tracking-wide">Consultoría Técnica</h4>
            <p className="text-xl text-white font-bold leading-relaxed italic">Ing. {companyData.interviewee.name}</p>
            <p className="text-lg text-slate-400 leading-relaxed mt-2">{companyData.interviewee.role}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-md group shadow-2xl">
            <ShieldAlert className="w-16 h-16 text-emerald-400 mb-8 group-hover:animate-pulse" />
            <h4 className="text-white text-2xl font-black mb-4 tracking-wide">Certificación Objetivo</h4>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">Infraestructura Nivel 4 (ISO/IEC 22237)</p>
            <p className="text-lg text-slate-500 mt-5 leading-relaxed">Disponibilidad del 99.995% anual.</p>
          </motion.div>
        </div>

        {/* NUEVO: EVIDENCIA VISUAL */}
        <InterviewEvidence />

        {/* NUEVA SECCIÓN: PREGUNTAS DE LA ENTREVISTA */}
        <InterviewQuestions />

        <IdentifiedProblems />

        <div className="space-y-32 flex flex-col items-center">
          {analysisData.map((data, i) => (
            <IsoCard key={i} data={data} />
          ))}
        </div>

        <ArchitectureSchema />

        {/* CIERRE DEL REPORTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-48 mt-32"
        >
          <div className="inline-block px-10 py-4 bg-blue-500/10 border border-blue-500/20 rounded-full mb-12">
            <span className="text-blue-400 font-black text-base uppercase tracking-[0.4em]">Conclusión Ejecutiva</span>
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="absolute -top-16 -left-16 text-[12rem] text-slate-900 font-serif opacity-50 leading-none">“</div>
            <div className="bg-slate-900/20 p-20 rounded-[5rem] border border-white/5 backdrop-blur-2xl relative z-10 shadow-3xl">
              <p className="text-3xl md:text-5xl text-slate-300 leading-normal font-light italic text-center">
                La infraestructura de <span className="text-white font-black underline decoration-blue-500 decoration-4 underline-offset-8">Tigo El Salvador</span> evoluciona hacia una arquitectura híbrida donde la resiliencia del Tier 4 físico se potencia con la elasticidad de AWS. El éxito de esta transformación reside en el desmantelamiento de sistemas legacy y la adopción de una cultura de automatización basada en IA.
              </p>
            </div>
            <div className="absolute -bottom-32 -right-16 text-[12rem] text-slate-900 font-serif opacity-50 leading-none">”</div>
          </div>
        </motion.div>
      </main>

      <footer className="bg-slate-950 py-32 text-center border-t border-white/5">
        <div className="mb-12 flex justify-center items-center gap-8">
          <div className="w-20 h-20 bg-[#00377d] rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
            <span className="text-white font-black text-3xl tracking-tighter">tigo</span>
          </div>
          <div className="h-16 w-[3px] bg-slate-800" />
          <div className="text-left">
            <p className="text-white font-black text-xl tracking-widest uppercase">Thomas Jefferson</p>
            <p className="text-slate-500 text-base font-medium mt-1">ITSI — Módulo de Gestión de Datos</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 font-black tracking-[1em] uppercase">
          El Salvador 2026
        </p>
      </footer>
    </div>
  );
}