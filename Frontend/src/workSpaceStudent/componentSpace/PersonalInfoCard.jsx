import React from 'react';
import { Slider, TextField, MenuItem, Button } from '@mui/material';


export default function PersonalInfoCard({ info }) {
    const commonLabelStyle = {
        color: "gray",
        fontSize: "16px",
    };

    const commonInputStyle = {
        color: "white",
    };
    return (
        <div className="bg-black ring-[0.5px] ring-gray-400 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Personal Info</h3>
                <p className="text-green-400 text-sm">35% Complete</p>
            </div>
            <Slider value={35} color="secondary" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                    label="Father Name"
                    variant="filled"
                    value={info?.ref_id?.fatherName || ""}
                    InputProps={{ readOnly: true, style: commonInputStyle }}
                    InputLabelProps={{
                        style: commonLabelStyle,
                        shrink: true, // ✅ ensures label floats when value exists
                    }}
                />

                <TextField
                    label="Mother Name"
                    variant="filled"
                    value={info?.ref_id?.motherName || ""}
                    InputProps={{ readOnly: true, style: commonInputStyle }}
                    InputLabelProps={{
                        style: commonLabelStyle,
                        shrink: true,
                    }}
                />

                <TextField
                    label="Roll No"
                    variant="filled"
                    value={info?.ref_id?.rollNumber || ""}
                    InputProps={{ readOnly: true, style: commonInputStyle }}
                    InputLabelProps={{
                        style: commonLabelStyle,
                        shrink: true,
                    }}
                />

                <TextField
                    label="Email Address"
                    variant="filled"
                    value={info?.email || ""}
                    InputProps={{ style: commonInputStyle }}
                    InputLabelProps={{
                        style: commonLabelStyle,
                        shrink: true,
                    }}
                />

                <TextField
                    label="College ID"
                    variant="filled"
                    value={info?.ref_id?.collegeID || ""}
                    InputProps={{ readOnly: true, style: commonInputStyle }}
                    InputLabelProps={{
                        style: commonLabelStyle,
                        shrink: true,
                    }}
                />

                <TextField
                    label="Languages"
                    select
                    variant="filled"
                    value="English"
                    InputProps={{ style: commonInputStyle }}
                    InputLabelProps={{
                        style: commonLabelStyle,
                        shrink: true,
                    }}
                >
                    {["English", "Hindi"].map((lang, i) => (
                        <MenuItem key={i} value={lang}>
                            {lang}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="flex justify-end">
                <Button variant="contained" color="secondary">Save</Button>
            </div>
        </div>
    );
}