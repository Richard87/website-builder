"use client"

import {DefaultTheme, Themes} from "@/defaults";
import {type Config, storeConfig} from "@/store";
import {useState} from "react";

export function ConfigEditor({config}: {config: Config}) {
    const [currentTheme, setTheme] = useState<string>(config.theme ?? DefaultTheme);
    const onSave = () => {
        storeConfig({...config, theme: currentTheme})
    }
    const onChangeTheme = (them: string) => {
        setTheme(them);
        document.body.dataset.theme = them
    }

    return <>
        <label className="form-control w-full max-w-xs">
            <input type="radio" value={currentTheme} className="theme-controller hidden"/>

            <div className="label">
                <span className="label-text">Select your favorite theme</span>
            </div>
            <select
                onChange={(e) => onChangeTheme(e.currentTarget.value)}
                name="theme-dropdown"
                value={currentTheme}
                className="btn btn-sm btn-block justify-start">
                {Themes.map((theme) => <option key={theme} value={theme}>{theme}</option>)}
            </select>
        </label>
        <button type="button" className={"btn btn-primary"} onClick={onSave}>Save configuration</button>
    </>
}
