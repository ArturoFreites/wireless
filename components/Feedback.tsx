'use client';

import { useFeedbackStore } from '@/store/feedback';
import { OctagonAlert } from 'lucide-react';
import { useEffect } from 'react';

export default function Feedback() {
    const { message, type, clearFeedback } = useFeedbackStore();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => clearFeedback(), 4000);
            return () => clearTimeout(timer);
        }
    }, [message, clearFeedback]);

    if (!message) return null;

    const config = {
        success: {
            color: 'bg-green-400',
            icon: <OctagonAlert className="text-white" size={18} />,
            title: 'Éxito',
        },
        error: {
            color: 'bg-red-400',
            icon: <OctagonAlert className="text-white" size={18} />,
            title: 'Error',
        },
        warning: {
            color: 'bg-primary',
            icon: <OctagonAlert className="text-white" size={18} />,
            title: 'Precaución',
        },
    }[type || 'success'];

    return (
        <div className={`w-11/12 md:w-1/3 fixed bottom-5 right-5 px-4 py-3 rounded text-white shadow-lg z-50 ${config.color}`}>
            <div className="flex items-center mb-1">
                {config.icon}
                <p className="ml-2 font-semibold text-sm">{config.title}</p>
            </div>
            <p className="text-xs">{message}</p>
        </div>
    );
}
