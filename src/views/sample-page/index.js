// material-ui
import { Grid, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    return (
        <Grid p={1}>
            <Grid container sx={{ marginX: 1, paddingX: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3"> Title </Typography>

                <Button variant="contained" color="warning">
                    <AddIcon />
                    Add Button
                </Button>
            </Grid>
        </Grid>
    );
};

export default SamplePage;
