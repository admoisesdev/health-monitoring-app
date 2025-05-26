import {  useState } from "react";
import { HealthTipResponse } from "@/infrastructure/interfaces";

export const initialHealthTips = [
  {
    id: 1,
    title: "Mantente hidratado",
    description:
      "Toma al menos 2 litros de agua al día para mantener tus órganos funcionando correctamente, mejorar la digestión y ayudar a regular la temperatura corporal.",
    icon: { name: "water", library: "FontAwesome5" },
  },
  {
    id: 2,
    title: "Ejercicio diario",
    description:
      "Haz ejercicio al menos 30 minutos al día para mejorar la salud cardiovascular, reducir el estrés y mantener un peso saludable.",
    icon: { name: "run", library: "MaterialCommunityIcons" },
  },
  {
    id: 3,
    title: "Alimentación balanceada",
    description:
      "Evita azúcares refinados y frituras. Opta por frutas, verduras, granos integrales y proteínas magras para mantener energía y prevenir enfermedades.",
    icon: { name: "food-apple", library: "MaterialCommunityIcons" },
  },
  {
    id: 4,
    title: "Sueño reparador",
    description:
      "Duerme entre 7 y 8 horas cada noche para mejorar la concentración, la memoria y fortalecer el sistema inmunológico.",
    icon: { name: "bed", library: "FontAwesome" },
  },
  {
    id: 5,
    title: "Chequeos médicos",
    description:
      "Consulta a tu médico regularmente para detectar a tiempo cualquier problema de salud y llevar un control de enfermedades crónicas.",
    icon: { name: "stethoscope", library: "FontAwesome" },
  },
  {
    id: 6,
    title: "Control del estrés",
    description:
      "Practica técnicas de relajación como meditación, respiración profunda o yoga para reducir el estrés y mejorar tu bienestar emocional.",
    icon: { name: "spa", library: "MaterialIcons" },
  },
  {
    id: 7,
    title: "Evita el sedentarismo",
    description:
      "Levántate y muévete al menos cada hora si trabajas sentado. Caminar unos minutos mejora la circulación y reduce la fatiga.",
    icon: { name: "walk", library: "MaterialCommunityIcons" },
  },
];

export const useHealthTips = () => {
  const [healthTips] = useState<HealthTipResponse[]>(initialHealthTips.slice(0, 5));


  return {
    healthTips,
  };
}