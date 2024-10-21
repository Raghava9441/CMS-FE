interface OAuthLinkProps {
    clientID: string;
    loginText: string;
    redirectURI: string;
    webexAPIBaseURL: string;
}

const OAuthLink: React.FC<OAuthLinkProps> = ({ clientID, loginText, redirectURI, webexAPIBaseURL }) => {
    console.log(webexAPIBaseURL)
    console.log(redirectURI)
    console.log(clientID)
    return (
        <>
            <a
                href={`${webexAPIBaseURL}?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=spark%3Aall%20spark%3Akms`}
            >
                {loginText}
            </a>
        </>
    );
};

export default OAuthLink;