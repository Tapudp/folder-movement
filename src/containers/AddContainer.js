import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { DEFAULT_FILE_DETAILS, DEFAULT_OBJECT_TYPES } from '../constants';
import { useAppContext } from '../context-store';

const Wrapper = styled.div`
    display: flex;
    padding: 10px;
    margin: 1px;
`;

const CreateObjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin: 10px 10px;
`;

const StyledFormField = styled.div`
    display: flex;
    align-items: center;
    width: 20rem;
    justify-content: space-between;
    margin: 10px;
`;

const StyledInput = styled.input`
    padding: 10px;
    margin: 1px;
`;

const StyledSelect = styled.select`
    padding: 10px;
`;

const ErrorBanner = styled.div`
    background-color: ${(props) => props.bannerColor};
    margin: 10px 0;
    padding: 10px;
    border-radius: 15px;
`;



export default function AddContainer() {
    const [show, toggle] = useState(false);
    const [err, setErr] = useState('');
    const [itemDetails, setItemDetails] = useState(() => DEFAULT_FILE_DETAILS);

    const { state, setState } = useAppContext();

    const openModal = () => {
        toggle(true);
    }

    const closeModal = () => {
        // To-Do: only delete items when the items are submitted
        setItemDetails(() => DEFAULT_FILE_DETAILS);
        toggle(false);
    }

    const fieldEditHandler = (e, fieldName) => {
        if (err) {
            setErr('');
        }
        setItemDetails(p => ({ ...p, [fieldName]: e.target.value }))
    }

    const fileTypeChange = (e) => {
        if (e) e.stopPropagation();
        if (e.target.value === '') return;
        setItemDetails(p => ({ ...p, fileType: e.target.value }))
    }

    const submitNewObject = () => {
        setErr('');
        console.log("current details of the object", JSON.stringify(itemDetails));
        const fileWithTheSameName = state.listOfFolders.find(item => item.fileName === itemDetails.fileName);
        if (fileWithTheSameName) {
            setErr('File already exists with this name, please try something different!');
            return;
        }
        setErr('');
        setState(p => ({ ...p, listOfFolders: [...p.listOfFolders, itemDetails] }));
        closeModal();
    }

    return <Wrapper>
        <button onClick={openModal}>Add to drive</button>
        <Modal show={show} handleClose={closeModal}>
            <CreateObjectContainer>
                <StyledFormField>
                    <label><h4>File Name</h4></label>
                    <StyledInput value={itemDetails.fileName} onChange={(e) => fieldEditHandler(e, 'fileName')} />
                </StyledFormField>
                <StyledFormField>
                    <label><h4>File Content</h4></label>
                    <StyledInput value={itemDetails.fileContent} onChange={(e) => fieldEditHandler(e, 'fileContent')} />
                </StyledFormField>
                <StyledFormField>
                    <label><h4>File Type</h4></label>
                    <StyledSelect selected={itemDetails.fileType} onChange={fileTypeChange}>
                        <option value="">Select an object type</option>
                        {DEFAULT_OBJECT_TYPES.map((type, idx) => (
                            <option key={`${type}-${idx}`} value={type}>{type}</option>
                        ))}
                    </StyledSelect>
                </StyledFormField>
                <button onClick={submitNewObject} disabled={err}>
                    Submit
                </button>
                <ErrorBanner bannerColor={err !== '' ? '#FAA0A0' : null}>
                    {err}
                </ErrorBanner>
            </CreateObjectContainer>
        </Modal>
    </Wrapper>
}