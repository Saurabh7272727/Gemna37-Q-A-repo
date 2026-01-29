import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './components/src/ui/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { decryptData } from '../../Auth/Encryption/jsondataEncryption.js'

const HomePage = ({ renderPart }) => {
    const navi = useNavigate();

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const getSessionToken = sessionStorage.getItem("sessionToken");

        if (!renderPart || getSessionToken === undefined) {
            navi('/');
            return;
        }

        try {
            const decrypteTheSession = decryptData(getSessionToken);
            const verify = z.object({
                id: z.string().length(24, "MongoDB ObjectId must be 24 characters")
                    .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
                expiration: z.number(),
                permission: z.object({
                    role: z.string().length(7, 'sessionToken invalid'),
                    update: z.boolean(),
                    upload: z.boolean(),
                    admin: z.boolean(),
                    routePermission: z.boolean()
                })
            });
            const parsed = verify.safeParse(decrypteTheSession);
            if (!parsed.success) {
                navi('/');
                console.log(parsed?.error);
                return;
            }
        } catch (error) {
            console.log(error);
            navi('/');
            return;
        }
    }, [renderPart]);

    return (
        <div className="mt-[60px] mb-12 md:mb-5 flex min-h-screen bg-slate-900 text-white">
            <Sidebar expanded={expanded} setExpanded={setExpanded} />
            <Outlet />
        </div>
    )
}

export default HomePage;