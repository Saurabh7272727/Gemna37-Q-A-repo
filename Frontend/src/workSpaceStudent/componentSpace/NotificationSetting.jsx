import { useLayoutEffect, useState } from "react";
import { Bell, ShieldCheck, Smartphone } from "lucide-react";
import MagicButton from '../AttendenceSystem/components/MagicButton.jsx';
import API from '../AttendenceSystem/ApiEndPoints/api.js';
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from 'react-redux';
import { updateFCMToken } from '../../ReduxStore/Slices/UserInfoSlice.js';
import { requestNotificationPermission } from '../../services/notificationService/allowNotificationService.js';

export default function NotificationSettings({ onToggle }) {
    const api = new API(import.meta.env.VITE_APP_BACKEND_URL);
    const user = useSelector(state => state?.userinfoSlice.user);
    const [enabled, setEnabled] = useState(false);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const checkOut = async () => {
            const res = await requestNotificationPermission();
            if (res.token && res.success) {
                if (user?.FCM_TOKEN === res.token) {
                    setEnabled(true);
                } else {
                    setEnabled(false);
                }
            }
        }
        checkOut();
    }, [user?.FCM_TOKEN]);

    const notificationInfo = [
        {
            id: 1,
            icon: Bell,
            title: "Real-time Notifications",
            desc: "G-Chat Notification, future Update Alert, Gemna notification"
        },
        {
            id: 2,
            icon: Smartphone,
            title: "Latest Device Only",
            desc: "Notifications will be sent only to the most recently enabled device."
        },
        {
            id: 3,
            icon: ShieldCheck,
            title: "Automatic Token Replacement",
            desc: "When enabled on a new device, the previous device notification  will be removed."
        }
    ];
    const { mutateAsync, status, error, data } = useMutation({
        mutationFn: (parameter) => api.postRequest(parameter?.endpoint, parameter?.payload),
        onSuccess: (data) => {
            if (data.status !== 201) {
                throw new Error(data.message);
            } else {
                // update the redux 
                if (data?.token)
                    dispatch(updateFCMToken(data?.token));
                return data;
            }
        },
        onError: (err) => {
            throw new Error('external service error');
        },
        retry: false,
    })

    const handleToggle = async (setUp) => {
        const newValue = !enabled;
        setUp(true)
        const response = await onToggle?.(newValue);
        if (response?.success) {
            if (response?.token) {
                const payload = {
                    userId: user._id ?? null,
                    token: response?.token
                };
                try {
                    await mutateAsync({
                        endpoint: '/api/v1/students/connection/notification/update/token',
                        payload
                    });
                    setEnabled(newValue);
                    setUp(false);
                } catch (error) {
                    setUp(false);
                    setEnabled(false);
                }
                return;
            }

            // disabled logic here implement ==========>
            try {
                await mutateAsync({
                    endpoint: '/api/v1/students/connection/notification/disabled',
                    payload: {
                        userId: user._id ?? null
                    }
                });
                setUp(false);
                setEnabled(false);
            } catch (error) {
                setUp(false);
                setEnabled(enabled);
            }
        } else {
            setUp(false);
            setEnabled(false);
            return;
        }
    };

    return (
        <div className="w-full flex justify-center px-4 py-10">

            <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-lg p-6">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Notification Settings
                        </h2>
                        <p className="text-sm text-gray-500">
                            Manage how you receive alerts.
                        </p>
                    </div>

                    <MagicButton text={`${enabled ? "disable" : "enable"}`} css={`${enabled ? "bg-red-800" : "bg-red-800"}`} submitHandler={(setUp) => handleToggle(setUp)} />
                </div>
                <div className="space-y-4">

                    {notificationInfo.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                title={item?.title}
                                className="flex gap-3 p-3 rounded-lg border bg-gray-50"
                            >
                                <div className="p-2 bg-blue-100 rounded-md">
                                    <Icon size={18} className="text-blue-600" />
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-800">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>
                <div className="mt-5 text-sm text-gray-500">
                    Status:{" "}
                    <span className={enabled ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                        {enabled ? "Enabled" : "Disabled"}
                    </span>
                </div>
                {
                    status === 'error' && <div className="text-xl text-red-700 font-semibold">
                        Error : {error?.message?.length > 17 ? "something was wrong" : error.message}
                    </div>
                }

                {
                    status === 'success' && <div className="text-green-700 font-bold">Response : {data?.message}</div>
                }
            </div>


        </div>
    );
}