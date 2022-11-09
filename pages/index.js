import React from "react";
import config from "../config.json"
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledHeader } from "../src/components/Header";

function HomePage() {
    const [valorFiltro, setValorFiltro] = React.useState("");

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro}/>
                <Header user_info={config.user_info} />
                <Timeline searchValue={valorFiltro} playlists={config.playlists} favorites={config.favorites} />
            </div>
        </>
    );
}

export default HomePage

function Header(params) {
    return (
        <StyledHeader>
            <img src={params.user_info.banner} className="banner-img" />
            <section className="user-info">
                <img src={`https://github.com/${params.user_info.github}.png`} className="pfp" />
                <div>
                    <h2>
                        {params.user_info.name}
                    </h2>
                    <p>
                        {params.user_info.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...params}) {
    const playlistNames = Object.keys(params.playlists);
    const favorites = params.favorites;
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = params.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized);
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
            <section key="favorite">
                <h2>Favoritos</h2>
                <div className="favorites">
                    {favorites.map((favorite) => {
                        return (
                            <a key={favorite.channel_url} href={favorite.channel_url}>
                                <img src={favorite.channel_img} alt="" />
                                <span>
                                    {favorite.channel_name}
                                </span>
                            </a>
                        )
                    })}
                </div>
            </section>
        </StyledTimeline>
    )
}