import React, { useEffect, useState } from "react";
import '../index.css';

const NewMessagePopup = ({ setPop_up_message, message, show }) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
                setPop_up_message(false);
            }, 4000); // 1 second auto hide

            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!visible) return null;

    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-slide-up">
            {message || "New message received!"}
        </div>
    );
};

export default NewMessagePopup;
