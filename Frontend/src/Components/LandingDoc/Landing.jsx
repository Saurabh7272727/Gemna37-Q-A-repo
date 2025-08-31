import React, { useEffect } from 'react'
import Home from '../../Pages/Home.jsx';
import ShowFeatureInLanding from './ShowFeatureInLanding.jsx';
import ChatDemoLanding from './ChatDemoLanding.jsx';

const Landing = () => {
    const dataSet = [
        {
            pictureSource: "https://dam-cdn.atl.orangelogic.com/AssetLink/737g80fw6ml20lr326ccpphj50d7xex2.webp",
            title: "Customize how your team’s work flows",
            text: "Set up, clean up, and automate even the most complicated project workflows."
        },
        {
            pictureSource: "https://dam-cdn.atl.orangelogic.com/AssetLink/03ww8q35s1o815s41383u0eye53o18ib.webp",
            title: "Stay on track – even when the track changes",
            text: "Use the timeline view to map out the big picture, communicate updates to stakeholders, and ensure your team stays on the same page"
        },
        {
            pictureSource: "https://dam-cdn.atl.orangelogic.com/AssetLink/737g80fw6ml20lr326ccpphj50d7xex2.webp",
            title: "Bye-bye, spreadsheets",
            text: "Keep every detail of a project centralized in real time so up-to-date info can flow freely across people, teams, and tools."
        },
        {
            pictureSource: "../../../gg.png",
            title: "Gemna.ai , Know your feeling about us",
            text: "We are supporting your goal and provide a enivorment to work with real world problem"
        }
    ]
    useEffect(() => {

        document.title = 'gemna.landing.ai'
    }, [])
    return (
        <>
            <Home />
            <ShowFeatureInLanding dataSet={dataSet} />
            <ChatDemoLanding />
        </>
    )
}

export default Landing;