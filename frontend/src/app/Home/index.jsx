import * as React from 'react';
import { Link } from "react-router-dom";

import { REGISTER } from "routes";

import { HomeContainer, Top, TopContainer, BottomContainer } from "./styles";
import { Grid } from "styles/common";

const Home = () => (
    <HomeContainer>
        <TopContainer>
            <Top>
                <div className="title">Get your gear together.</div>
                <h1>Packstack makes it easy for you to manage your<br/>&nbsp;
                    backpacking gear and create packing lists.</h1>
                <Link to={REGISTER} className="primary-link">
                    GET STARTED
                </Link>
            </Top>
        </TopContainer>
        <BottomContainer>
            <Grid>
                <div className="forty">
                    <h2>Manage your inventory</h2>
                    <p>Your gear is the most important part of any trip.
                        Packstack lets you view and maintain your items all in one spot.</p>
                </div>
                <div className="sixty">
                    <img src="/packstack-inventory.gif" alt="Backpack gear inventory management"/>
                </div>
            </Grid>
            <Grid className="column-reverse">
                <div className="sixty">
                    <img src="/packstack-create-pack.gif" alt="Create a backpacking packing list"/>
                </div>
                <div className="forty">
                    <h2>Create packing lists</h2>
                    <p>Once you’ve added your gear, you can use your inventory to create packing lists.
                        Each pack can include additional information about the trip, too.</p>
                </div>
            </Grid>
            <Grid>
                <div className="forty">
                    <h2>Share your packs</h2>
                    <p>Packstack generates a detailed, well-formatted packing list for every pack you create,
                        which you can share or reference when it’s time to load your pack.</p>
                </div>
                <div className="sixty">
                    <img src="/packstack-view-pack.gif" alt="View backpacking packing list"/>
                </div>
            </Grid>
            <div style={{ textAlign: 'center' }}>
                <Link to={REGISTER} className="primary-link">
                    GET STARTED
                </Link>
            </div>
        </BottomContainer>
    </HomeContainer>
);

export default Home;