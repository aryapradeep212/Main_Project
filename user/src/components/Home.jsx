import * as React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import placement from "../background/placement.jpg";
import NavBar from "./NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: "100px", height: "100vh" }}
      >
        {" "}
        {/* Set height to 100vh for full-screen */}
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          {" "}
          {/* Set height to 100% for full-screen */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: "sans",
              fontWeight: "bold",
              fontSize: "3.5rem",
              margin: "0px 0",
              textAlign: "center",
              transition: "none",
            }}
          >
            GOVERNMENT POLYTECHNIC COLLEGE, PERUMBAVOOR
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "sans",
              fontWeight: "bold",
              fontSize: "2rem",
              margin: "20px 0",
              textAlign: "center",
              transition: "none",
            }}
          >
            Koovappady P.O. Ernakulam - 683 544 Kerala
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "sans",
              fontWeight: "bold",
              fontSize: "3rem",
              margin: "50px 0",
              background: "rgb(211, 211, 211)",
              textAlign: "center",
              transition: "none",
            }}
          >
            Placement Cell
          </Typography>
          <Grid container spacing={4} style={{ height: "100%" }}>
            {" "}
            {/* Set height to 100% for full-screen */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "cursive",
                  margin: "50px 0",
                  textAlign: "justify",
                  transition: "none",
                }}
              >
                Quality employment for Sustainability is the prime motto of our
                Career Guidance and Placement Cell. Near to 100%, placements
                happen through on-campus and off-campus modes. We ensure that at
                least 20% of students of every program are nurtured with all
                skills required for ready employment through Industry on Campus
                (IoC), Production and Training Center (PAT), FABLab, Outreach
                programs, and IEDC activities. These students are mentored with
                all skills needed for industry including skills needed for
                better customer interaction, Technical skills that are needed to
                perform from day 1 of employment without additional training.
                Functioning as a centralized hub for recruitment, the college
                offers the following facilities for centralized placements.
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "cursive",
                  margin: "30px 0",
                  textAlign: "justify",
                  transition: "none",
                }}
              >
                <ul>
                  <li>
                    State-of-the-art auditorium complex with 850 PAX and
                    generator backup.
                  </li>
                  <li>Seminar hall with 120 PAX with PA and ICT facilities.</li>
                  <li>
                    Mini seminar hall for online interaction system set with IT
                    infrastructure worth 20 lakhs by Kerala.
                  </li>
                  <li>State Information Technology Infrastructure Limited.</li>
                  <li>
                    More than 250 computers on the network for online
                    examinations.
                  </li>
                  <li>Two numbers of interview rooms for campus placements.</li>
                  <li>
                    Language lab with 25 computers to test language proficiency.
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={placement}
                alt="placement"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <Typography variant="h4" sx={{ fontFamily: "cursive" }}>
                Jiby P Joseph
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "cursive" }}>
                Placement Officer
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "cursive" }}>
                Email: placement@gptcperumbavoor.ac.in
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "cursive" }}>
                Phone: 9495778750
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
