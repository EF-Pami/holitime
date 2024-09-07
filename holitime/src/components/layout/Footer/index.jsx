
import { StyledFooter } from "./styled";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Twitter } from "@mui/icons-material";

export default function Footer() {
    return (
        <StyledFooter>
            <div className="socialsContainer">
                <FacebookIcon fontSize="large" sx={{color: "blue"}} />
                <InstagramIcon fontSize="large" sx={{color: "blue"}} />
                <Twitter fontSize="large" sx={{color: "blue"}} />
            </div>
            <p>&copy; HoliTime</p>
        </StyledFooter>
    );
}
