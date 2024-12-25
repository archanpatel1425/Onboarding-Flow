'use client';

import Form1 from "../components/Form1";
import Form2 from "../components/Form2";
import Form3 from "../components/Form3";
import Form4 from "../components/Form4";
import Form5 from "../components/Form5";
import { useRef, useState } from "react";

export default function App() {
    const [step, setStep] = useState(1);
    const totalSteps = 5;

    const formHandlers = useRef<{ [key: number]: () => boolean }>({});

    const registerFormHandler = (formStep: number, handler: () => boolean) => {
        setStep(formStep)
        formHandlers.current[formStep] = handler;
    };

    const moveToStep = async (newStep: number) => {
        const currentHandler = formHandlers.current[step];
        if (currentHandler) {
            const isValid = currentHandler();
            if (!isValid) {
                return;
            }
        }

        setStep(newStep);
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return <Form1 nextForm={nextForm} registerHandler={(handler) => registerFormHandler(1, handler)} />;
            case 2:
                return <Form2 nextForm={nextForm} previousForm={previousForm} registerHandler={(handler) => registerFormHandler(2, handler)} />;
            case 3:
                return <Form3 nextForm={nextForm} previousForm={previousForm} registerHandler={(handler) => registerFormHandler(3, handler)} />;
            case 4:
                return <Form4 nextForm={nextForm} previousForm={previousForm} registerHandler={(handler) => registerFormHandler(4, handler)} />;
            case 5:
                return <Form5 previousForm={previousForm} registerHandler={(handler) => registerFormHandler(5, handler)} />;
            default:
                return null;
        }
    };

    const nextForm = () => moveToStep(step + 1);
    const previousForm = () => moveToStep(step - 1);

    return (
        <div className="min-h-screen bg-gray-100 p-6 ">
            {/* Progress Bar */}
            <div className="relative flex items-center justify-center mb-8">
                <div className="absolute w-full h-2 bg-gray-300 rounded-full">
                    <div
                        className="h-2 bg-blue-500 rounded-full transition-all"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                </div>
                <div className="relative z-10 flex justify-between w-full max-w-4xl">
                    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((formNumber) => (
                        <button
                            key={formNumber}
                            onClick={() => moveToStep(formNumber)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${step === formNumber
                                ? "bg-blue-500"
                                : "bg-gray-400 hover:bg-gray-500"
                                }`}
                        >
                            {formNumber}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center">
                {renderForm()}
            </div>
        </div>
    );
}
