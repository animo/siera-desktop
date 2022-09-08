import React, {PropsWithChildren, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Agent, FileSystem} from "@aries-framework/core";
import Indy from "indy-sdk";
import AgentProvider from "@aries-framework/react-hooks";
import { agentInitializer } from "./agent";
import {App} from "./App";

// Typings for the exposed indy and filesystem
declare global {
    interface Window {
        indy: typeof Indy;
        fs: FileSystem;
    }
}

export const AgentContext: React.FunctionComponent<PropsWithChildren> = ({children,}) => {
    const [agent, setAgent] = useState<Agent>();

    useEffect(() => {
        (async () => setAgent(await agentInitializer()))();
    }, []);

    return <AgentProvider agent={agent}>{children}</AgentProvider>;
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <AgentContext>
            <App/>
        </AgentContext>
    </React.StrictMode>
);