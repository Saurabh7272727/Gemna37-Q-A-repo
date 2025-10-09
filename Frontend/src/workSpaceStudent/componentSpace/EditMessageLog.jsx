import React from "react";
import { Alert } from "@mui/material";

export default function EditEmailMessage({ message = "Only email can be edited." }) {
    return (
        <div className="w-full mb-4">
            <Alert
                severity="info"
                sx={{
                    borderRadius: "10px",
                    backgroundColor: "#1e1e1e",
                    color: "#ccc",
                    "& .MuiAlert-icon": { color: "#9c27b0" },
                }}
            >
                {message}
            </Alert>
        </div>
    );
}
