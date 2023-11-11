import { Box, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const EventLocation = ({ address, handleSelect, handleChange }) => {
    const searchOptions = {
        componentRestrictions: { country: 'ET' }
    };

    return (
        <Box sx={{ marginY: 2 }}>
            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} searchOptions={searchOptions}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <Box>
                        <TextField
                            label="Event location"
                            style={{ width: '60%' }}
                            {...getInputProps({
                                className: 'location-search-input'
                            })}
                        />
                        <Box className="autocomplete-dropdown-container" sx={{ overflow: 'hidden', zIndex: 2 }}>
                            {loading && <CircularProgress size={20} />}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                return (
                                    <Box {...getSuggestionItemProps(suggestion, { className })} sx={{ padding: 1 }}>
                                        <span>{suggestion.description}</span>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                )}
            </PlacesAutocomplete>
        </Box>
    );
};

export default EventLocation;
