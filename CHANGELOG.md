<center>
<h1>DRC ChangeLog</h1>
</center>
<h2><span style="color:#005fd3">0.2.6</span> (21/07/23) </h2>
<ul>
    <li>
        <p>
        <b>Fixed compatibility errors</b>
        <br/>
        Thanks to the package <a href="https://www.npmjs.com/package/npm-run-all">npm-run-all</a> there is no need to separate the start scripts along platforms.
        </p>
    </li>
    <li>
        <p>
        <b>Why so inactive?</b>
        <br/>
        We are aware that the app is having a lot less activity, this is because our main computer (where the repo and the project is fully set-up) bricked up.
        However, we stimate that in less than a week it may come back to live.
        </p>
    </li>
    <li>
        <p>
        <b>What now?</b>
        <br/>
        There is room for improvement, we have plans to make the dashboar able to make "admin's things", such like channel creations, role's permissions configuration, channel editing...    
        Even thought those things are important, we are aware that setting the app is a... <i>lazy proccess</i> , thats why we are focusing on bringing a Docker version up.
        </p>
    </li>
</ul>

<h2><span style="color:#005fd3">0.2.5</span> (21/05/23) </h2>
<ul>
    <li>
        <p>
        <b>Fixed Critical Bug</b>
        <br/>
        Fixed a bug that crashed the app on minimum-intents clients
        </p>
    </li>
    <li>
        <p>
        <b>Fixed Default Intents Mismatch</b>
        <br/>
        There was a Intent on "Default" mode that was default-disables on the Discord Developer Portal
        </p>
    </li>
    <li>
        <p>
        <b>Known Errors</b>
        <br/>
        We are aware that the app is not correctly being runned on Linux via the start.sh script.<br/>
        As a temporary workaround, you can <code>npm run start</code> <b>on the root directory</b>, and on a separate terminal, on the <b>/web/ folder</b>, run <code>npm run dev</code>
        </p>
    </li>
</ul>


<h2><span style="color:#005fd3">0.2.5</span> (05/04/23) </h2>
<ul>
    <li>
        <p>
        <b>Fixed Critical Bug</b>
        <br/>
        Fixed a bug that crashed the renderer every time the MemberInfo tab is selected
        </p>
    </li>
    <li>
        <p>
        <b>Fixed Message Deletion on Dms</b>
        <br/>
        Message deletion wasn't working on dm's, now they are
        </p>
    </li>
</ul>

<h2><span style="color:#005fd3">0.2.5</span> (04/04/23) </h2>
<ul>
    <li>
        <p>
        <b>Profile Selector</b>
        <br/>
        We added a profile selector, now you can create and select a profile without having to type all the token/intents   again.
        </p>
        <details>
            <summary>Show Images</summary>
            <img src="https://i.imgur.com/yVE2TTu.png" />
            <img src="https://i.imgur.com/z9ZoEob.png" />
        </details>
    </li>
</ul>
