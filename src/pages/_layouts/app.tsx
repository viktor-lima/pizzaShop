import { Outlet } from "react-router-dom";

export function AppLayout(){
    return (
        <div>
            <div>Cabeçalho</div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}