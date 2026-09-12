export const DIETARY_RESTRICTIONS = {
    label: "Restricciones alimentarias",
    options: [
        { value: "none", label: "No tengo ninguna restricción" },
        { value: "celiac", label: "Celíaquía" },
        { value: "lactose", label: "Intolerancia a la lactosa" },
        { value: "vegetarian", label: "Vegetarianismo" },
        { value: "vegan", label: "Veganismo" },
        { value: "hypertension", label: "Hipertensión" },
        { value: "diabetes", label: "Diabetes" },
    ],
} as const;
