
import { StyledFooter } from "./styled";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Twitter } from "@mui/icons-material";

export default function Footer() {
    return (
        <StyledFooter>
            <div className="socialsContainer">
                <FacebookIcon fontSize="large" sx={{color: "white"}} />
                <InstagramIcon fontSize="large" sx={{color: "white"}} />
                <Twitter fontSize="large" sx={{color: "white"}} />
            </div>
            <p className="text-white uppercase text-2xl">&copy; HoliTime</p>
        </StyledFooter>
    );
}
