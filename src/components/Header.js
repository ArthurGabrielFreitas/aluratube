import styled from "styled-components";

export const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.backgroundLevel1};

    .banner-img {
        height: 230px;
        width: 100%;
        top: 56px;
        object-fit: cover;
        object-position: 100% 70%;
    }

    .pfp {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
    .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
}
`;