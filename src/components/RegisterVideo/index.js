import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsForm) {
    const [values, setValues] = React.useState(propsForm.initialValues);

    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({ titulo: "", url: "" });
        }
    };
}

const PROJECT_URL = "https://idxazxjswpteubyhchyw.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkeGF6eGpzd3B0ZXVieWhjaHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODUzNzEsImV4cCI6MTk4Mzg2MTM3MX0.S7dU6LMnSvv9sWA980ylnSlLqtj0q4iMvKzFC5Nx1_s"
const supabase = createClient(PROJECT_URL, PROJECT_KEY);

function getThumbnail(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        return `https://img.youtube.com/vi/${videoId.substring(0, ampersandPosition)}/hqdefault.jpg`
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel ? (
                <form onSubmit={(e) => {
                    e.preventDefault();

                    supabase.from("videos").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos"
                    })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input placeholder="Título do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange} />
                        <input placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            ) : false}
        </StyledRegisterVideo>
    );
}