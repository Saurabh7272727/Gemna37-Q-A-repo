import React, { useActionState } from 'react'

const fun = async (pre, formdata) => {
    console.log("pre =>", pre)
    console.log(Object.fromEntries([...formdata]));
    return { message: "hello world i am useActionState" };
}
const LoginUser = () => {

    const [state, action, pending] = useActionState(fun, null);
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-black text-white'>
            <form action={action}>
                <input type="text" name='name' />
                <input type="text" name="email" id="22" />
                <button type='submit'>{pending ? "loading.." : "submit"}</button>
                {state?.message}
            </form>
        </div>
    )
}

export default LoginUser; 