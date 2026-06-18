"use client"
import {useEffect, useState} from "react";
import ShadcnInput from "@/Componentes/shadcnInput2";
import ShadcnButton2 from "@/Componentes/shadcnButton2";
import {useAgenda} from "@/ContextosGlobales/AgendaContext";
import {toast} from "react-hot-toast";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {SelectDinamic} from "@/Componentes/SelectDinamic";
import {RutInput} from "@/Componentes/RutInput";
import {PhoneInput} from "@/Componentes/PhoneInput";
import Image from "next/image";

/* ─────────────────────────────────────────────
   FORMATO CLP
───────────────────────────────────────────── */
const formatoCLP = new Intl.NumberFormat("es-CL", {
    style: "currency", currency: "CLP",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
});

/* ─────────────────────────────────────────────
   COMPONENTE
───────────────────────────────────────────── */
export default function FormularioReservaProfesional() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const {id_profesional} = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    /* ── Datos del paciente ── */
    const [nombrePaciente,   setNombrePaciente]   = useState("");
    const [apellidoPaciente, setApellidoPaciente] = useState("");
    const [rut,              setRut]              = useState("");
    const [telefono,         setTelefono]         = useState("");
    const [email,            setEmail]            = useState("");

    /* ── Datos del profesional ── */
    const [profesionalNombre,      setProfesionalNombre]      = useState("");
    const [descripcionProfesional, setDescripcionProfesional] = useState("");

    /*
     * ── Servicio seleccionado ──
     * En el flujo normal viene pre-seleccionado desde el calendario (context.servicio).
     * Si el usuario llega directamente a esta URL sin pasar por el calendario,
     * se muestra el selector de servicios como fallback.
     */
    const [listaTarifas,          setListaTarifas]          = useState([]);
    const [tarifaIndexFallback,   setTarifaIndexFallback]   = useState(""); // solo para el fallback
    const [servicioNombre,        setServicioNombre]        = useState("");
    const [totalPago,             setTotalPago]             = useState("");
    const [procesandoPago,        setProcesandoPago]        = useState(false);

    /* ── Contexto global (fecha, hora y servicio vienen del calendario) ── */
    const {
        horaInicio,
        horaFin,
        fechaInicio,
        fechaFinalizacion,
        servicio,
        setHoraInicio,
        setHoraFin,
        setFechaInicio,
        setFechaFinalizacion,
    } = useAgenda();

    /*
     * Al montar, si el contexto ya tiene un servicio elegido en el calendario
     * lo usamos directamente. Si no (acceso directo a la URL), esperamos
     * a que el usuario lo elija en el selector de fallback.
     */
    useEffect(() => {
        if (servicio) {
            setServicioNombre(servicio.nombre);
            setTotalPago(servicio.precio);
        }
    }, [servicio]);

    useEffect(() => {
        const fechaInicioQuery = searchParams.get("fechaInicio");
        const fechaFinalizacionQuery = searchParams.get("fechaFinalizacion");
        const horaInicioQuery = searchParams.get("horaInicio");
        const horaFinQuery = searchParams.get("horaFin");

        if (!fechaInicio && fechaInicioQuery) setFechaInicio(fechaInicioQuery);
        if (!fechaFinalizacion && fechaFinalizacionQuery) setFechaFinalizacion(fechaFinalizacionQuery);
        if (!horaInicio && horaInicioQuery) setHoraInicio(horaInicioQuery);
        if (!horaFin && horaFinQuery) setHoraFin(horaFinQuery);
    }, [
        searchParams,
        fechaInicio,
        fechaFinalizacion,
        horaInicio,
        horaFin,
        setFechaInicio,
        setFechaFinalizacion,
        setHoraInicio,
        setHoraFin,
    ]);

    /* ── Carga datos del profesional ── */
    useEffect(() => {
        if (!id_profesional) return;
        fetch(`${API}/profesionales/seleccionarProfesional`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id_profesional}),
        })
            .then(r => r.json())
            .then(data => {
                if (data?.[0]) {
                    setProfesionalNombre(data[0].nombreProfesional ?? "");
                    setDescripcionProfesional(data[0].descripcionProfesional ?? "");
                }
            })
            .catch(err => console.error("[Formulario] profesional:", err));
    }, [id_profesional]);

    /*
     * ── Carga tarifas para el selector de fallback ──
     * Solo se usa si el usuario llega directo a esta URL sin pasar por el calendario.
     */
    useEffect(() => {
        if (!id_profesional) return;
        fetch(`${API}/tarifasProfesional/seleccionarTarifasPorProfesional`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({profesional_id: id_profesional}),
        })
            .then(r => r.ok ? r.json() : [])
            .then(data => { if (Array.isArray(data)) setListaTarifas(data); })
            .catch(err => console.error("[Formulario] tarifas fallback:", err));
    }, [id_profesional]);

    /* ══════════════════════════════════════════
       ACCIONES
    ══════════════════════════════════════════ */

    /**
     * Crea la reserva pendiente de pago y redirige al checkout de Mercado Pago.
     * Validaciones:
     *  1. Debe haber fecha y hora (vienen del calendario).
     *  2. Todos los campos del paciente deben estar completos.
     */
    async function pagarMercadoPago() {
        const motivoReserva = (servicio?.nombre || servicioNombre || "").trim();
        const montoReserva = Number(servicio?.precio ?? totalPago);

        /* ── Validaciones de guard ── */
        if (procesandoPago) return;
        if (!fechaInicio || !fechaFinalizacion || !horaInicio || !horaFin) {
            toast.error("Debes seleccionar fecha y hora antes de completar el formulario. Vuelve al calendario.");
            return;
        }
        if (!motivoReserva || !Number.isFinite(montoReserva) || montoReserva <= 0) {
            toast.error("Debes seleccionar un servicio antes de continuar.");
            return;
        }
        if (!nombrePaciente.trim() || !apellidoPaciente.trim() || !rut.trim() || !telefono.trim() || !email.trim()) {
            toast.error("Completa todos los campos del formulario");
            return;
        }

        setProcesandoPago(true);

        try {
            const res = await fetch(`${API}/pagosMercadoPago/create-order`, {
                method: "POST",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({
                    tituloProducto:   `Reserva Consulta: ${motivoReserva} con ${profesionalNombre || "profesional"}`,
                    precio:           montoReserva,
                    cantidad:         1,
                    nombrePaciente:    nombrePaciente.trim(),
                    apellidoPaciente:  apellidoPaciente.trim(),
                    rut:               rut.trim(),
                    telefono:          telefono.trim(),
                    email:             email.trim(),
                    fechaInicio,
                    horaInicio,
                    fechaFinalizacion,
                    horaFinalizacion:  horaFin,
                    estadoReserva:     "reservada",
                    totalPago:         montoReserva,
                    id_profesional,
                }),
                mode: "cors",
            });

            let respuesta;
            try { respuesta = await res.json(); }
            catch { respuesta = null; }

            const mensajeError = String(respuesta?.message || respuesta?.error || "").toLowerCase();

            // Otro paciente pudo tomar el horario mientras se completaba el formulario.
            if (res.status === 409 || mensajeError.includes("conflicto") || mensajeError.includes("horario")) {
                toast.error("Ese horario ya fue tomado. Vuelve al calendario y elige otro.");
                setProcesandoPago(false);
                return;
            }
            if (!res.ok) {
                console.error("[Formulario] error al crear pago:", res.status, respuesta);
                toast.error(respuesta?.error || "No se pudo iniciar el pago. Intenta nuevamente o contáctanos por WhatsApp.");
                setProcesandoPago(false);
                return;
            }

            const checkoutUrl = respuesta?.init_point;
            if (typeof checkoutUrl === "string" && checkoutUrl.startsWith("https://")) {
                window.location.assign(checkoutUrl);
                return;
            }

            console.error("[Formulario] Mercado Pago no devolvió init_point:", respuesta);
            toast.error("No se recibió el enlace de pago. Intenta nuevamente.");
            setProcesandoPago(false);
        } catch (err) {
            console.error("[Formulario] error de red al crear pago:", err);
            toast.error("No se pudo conectar con la pasarela de pago. Intenta nuevamente.");
            setProcesandoPago(false);
        }
    }

    /* ══════════════════════════════════════════
    RENDER
    ══════════════════════════════════════════ */
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.10),transparent_65%)] lg:block"/>

            <div className="relative mx-auto max-w-2xl">
                <div className="mx-auto w-full max-w-2xl">

                {/* ── Header ── */}
                <header className="animate-reveal-up mb-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-slate-500 shadow-sm">
                        Reserva Online
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {profesionalNombre || "Cargando..."}
                    </h1>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                        {descripcionProfesional}
                    </p>
                    <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"/>
                </header>

                <form
                    className="animate-reveal-up-delay space-y-8 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur sm:p-8"
                    onSubmit={e => e.preventDefault()}
                >
                    {/* ════════════════════════════════
                        SECCIÓN: SERVICIO
                        Si viene del calendario → card readonly.
                        Si acceso directo → selector fallback.
                    ════════════════════════════════ */}
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Servicio</h2>
                        <div className="mt-1 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"/>

                        {servicio ? (
                            /*
                             * Servicio pre-seleccionado desde el calendario.
                             * Se muestra como card informativa (no editable aquí).
                             * Para cambiarlo el paciente debe volver al paso anterior.
                             */
                            <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{servicio.nombre}</p>
                                    <p className="text-xs text-slate-500">{servicio.duracion_min} min de atención</p>
                                </div>
                                {Number(servicio.precio) > 0 && (
                                    <span className="text-sm font-bold text-emerald-700">
                                        {formatoCLP.format(servicio.precio)}
                                    </span>
                                )}
                            </div>
                        ) : (
                            /*
                             * Fallback: el paciente llegó directo a esta URL sin pasar por
                             * el calendario. Puede seleccionar el servicio aquí.
                             */
                            <div className="mt-4">
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Motivo de consulta</label>
                                <SelectDinamic
                                    value={tarifaIndexFallback}
                                    onChange={e => {
                                        const idx = e.target.value;
                                        setTarifaIndexFallback(idx);
                                        const t = listaTarifas[idx];
                                        if (t) { setServicioNombre(t.nombreServicio); setTotalPago(t.precio); }
                                    }}
                                    placeholder="Seleccione un servicio"
                                    options={listaTarifas.map((t, i) => ({
                                        value: i,
                                        label: `${t.nombreServicio}${Number(t.precio) > 0 ? ` — ${formatoCLP.format(t.precio)}` : ""}`,
                                    }))}
                                    className={tarifaIndexFallback !== "" ? "border-emerald-400 bg-emerald-50/50 font-medium text-slate-900" : ""}
                                />
                            </div>
                        )}
                    </div>

                    {/* ════════════════════════════════
                        SECCIÓN: DATOS PERSONALES
                    ════════════════════════════════ */}
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Datos personales</h2>
                        <div className="mt-1 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"/>
                        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Nombre</label>
                                <ShadcnInput value={nombrePaciente} onChange={e => setNombrePaciente(e.target.value)} placeholder="Ej: Ana" className="w-full"/>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Apellido</label>
                                <ShadcnInput value={apellidoPaciente} onChange={e => setApellidoPaciente(e.target.value)} placeholder="Ej: Pérez" className="w-full"/>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">RUT</label>
                                <RutInput value={rut} onChange={clean => setRut(clean)}/>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Correo electrónico</label>
                                <ShadcnInput value={email} onChange={e => setEmail(e.target.value)} placeholder="ejemplo@correo.cl" className="w-full"/>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Teléfono</label>
                                <PhoneInput value={telefono} onChange={full => setTelefono(full)}/>
                            </div>
                        </div>
                    </div>

                    {/* ════════════════════════════════
                        SECCIÓN: RESUMEN DE CITA
                        Muestra fecha, hora (con duración real)
                        y valor. Solo aparece si hay datos.
                    ════════════════════════════════ */}
                    {(fechaInicio || horaInicio || totalPago || servicioNombre) && (
                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Resumen de tu cita</h2>
                            <div className="mt-1 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"/>
                            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {/* Servicio */}
                                    {servicioNombre && (
                                        <div className="flex items-center gap-3 sm:col-span-2">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs text-white font-bold">S</div>
                                            <div>
                                                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Servicio</p>
                                                <p className="text-sm font-semibold text-slate-800">{servicioNombre}</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Fecha */}
                                    {fechaInicio && (
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs text-white">D</div>
                                            <div>
                                                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Fecha</p>
                                                <p className="text-sm font-semibold text-slate-800">{fechaInicio}</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Horario */}
                                    {horaInicio && horaFin && (
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs text-white">H</div>
                                            <div>
                                                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Horario</p>
                                                <p className="text-sm font-semibold text-slate-800">{horaInicio} – {horaFin}</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Valor */}
                                    {Number(totalPago) > 0 && (
                                        <div className="flex items-center gap-3 sm:col-span-2">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">$</div>
                                            <div>
                                                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Valor consulta</p>
                                                <p className="text-sm font-bold text-emerald-700">{formatoCLP.format(totalPago)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Botones ── */}
                    <div className="border-t border-slate-100 pt-6">
                        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-sky-100 bg-sky-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-800">Pago procesado de forma segura</p>
                                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">Serás redirigido para elegir tu medio de pago.</p>
                            </div>
                            <Image
                                src="/mercadopago.png"
                                alt="Mercado Pago"
                                width={150}
                                height={61}
                                sizes="150px"
                                className="h-auto w-[132px] shrink-0 object-contain"
                            />
                        </div>

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <ShadcnButton2
                                nombre="RETROCEDER"
                                funcion={() => router.push(`/agendaEspecificaProfersional/${id_profesional}`)}
                                disabled={procesandoPago}
                            />
                            <ShadcnButton2
                                nombre={procesandoPago ? "REDIRIGIENDO AL PAGO..." : "PAGAR Y RESERVAR"}
                                funcion={pagarMercadoPago}
                                disabled={procesandoPago}
                            />
                        </div>
                    </div>
                </form>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Revisa que los datos sean correctos antes de confirmar tu reserva.
                </p>
                </div>
            </div>
        </div>
    );
}
