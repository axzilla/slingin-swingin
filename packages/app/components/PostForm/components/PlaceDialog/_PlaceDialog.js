// // Packages
// import PropTypes from 'prop-types'
// import _ from 'lodash'

// // Utils
// import isEmpty from '@utils/isEmpty'

// // Services
// import { getPlacesBySearchTerm } from '@services/place'

// // MUI
// import Grid from '@material-ui/core/Grid'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import TextField from '@material-ui/core/TextField'
// import Dialog from '@material-ui/core/Dialog'
// import DialogTitle from '@material-ui/core/DialogTitle'
// import IconButton from '@material-ui/core/IconButton'
// import CloseIcon from '@material-ui/icons/Close'

// function PlaceDialog({
//   isPlaceDialogOpen,
//   setIsPlaceDialogOpen,
//   place,
//   setPlace,
//   places,
//   setPlaces
// }) {
//   async function handleGetPlaces(event) {
//     try {
//       if (event && event.target.value.length > 0) {
//         const searchTerm = event.target.value
//         const foundPlaces = await getPlacesBySearchTerm({ searchTerm })
//         setPlaces(foundPlaces.data)
//       }
//     } catch (error) {
//       if (error) throw error
//     }
//   }

//   return (
//     <Dialog
//       maxWidth="sm"
//       fullWidth
//       open={isPlaceDialogOpen}
//       onClose={() => setIsPlaceDialogOpen(false)}
//     >
//       <DialogTitle>
//         <Grid container justify="space-between" alignItems="center" spacing={2}>
//           <Grid item xs>
//             <Autocomplete
//               disableClearable
//               freeSolo
//               value={!isEmpty(place) ? place : null}
//               onInputChange={_.debounce(handleGetPlaces, 1000)}
//               onChange={(event, place) => {
//                 setPlace(place)
//               }}
//               options={places}
//               getOptionLabel={option => option.mapBox.place_name}
//               renderInput={params => (
//                 <TextField
//                   {...params}
//                   onChange={event => {
//                     if (event.target.value.length < 1) {
//                       setPlace(null)
//                       setPlaces([])
//                     }
//                   }}
//                   autoFocus
//                   color="secondary"
//                   variant="outlined"
//                   margin="dense"
//                   placeholder="Search for places"
//                   // InputProps={{
//                   //   startAdornment: (
//                   //     <InputAdornment position="start">
//                   //       <SearchIcon />
//                   //     </InputAdornment>
//                   //   )
//                   // }}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item>
//             <IconButton onClick={() => setIsPlaceDialogOpen(false)} size="small">
//               <CloseIcon />
//             </IconButton>
//           </Grid>
//         </Grid>
//       </DialogTitle>
//     </Dialog>
//   )
// }

// PlaceDialog.propTypes = {
//   setGif: PropTypes.func.isRequired,
//   isPlaceDialogOpen: PropTypes.bool.isRequired,
//   setIsPlaceDialogOpen: PropTypes.func.isRequired,
//   place: PropTypes.object.isRequired,
//   setPlace: PropTypes.func.isRequired,
//   places: PropTypes.array.isRequired,
//   setPlaces: PropTypes.func.isRequired
// }

// export default PlaceDialog
