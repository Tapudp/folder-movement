import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { DEFAULT_OBJECT_TYPES } from '../constants';
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


export default function AddContainer() {
    const [show, toggle] = useState(false);
    const [itemDetails, setItemDetails] = useState({
        fileName: '',
        fileContent: '',
        fileType: 'folder',
    });

    const { state, setState } = useAppContext();
    console.log('<><><><> in add container', state, setState);

    const fileTypeChange = (e) => {
        if (e) e.stopPropagation();
        if (e.target.value === '') return;
        setItemDetails(p => ({ ...p, fileType: e.target.value }))
    }

    return <Wrapper>
        <button onClick={() => toggle(p => !p)}>Add to drive</button>
        <Modal show={show} handleClose={() => toggle(false)}>
            <h2>Create a new video object</h2>
            <CreateObjectContainer>
                <StyledFormField>
                    <label><h4>File Name</h4></label>
                    <StyledInput onChange={(e) => setItemDetails(p => ({ ...p, fileName: e.target.value }))} />
                </StyledFormField>
                <StyledFormField>
                    <label><h4>File Content</h4></label>
                    <StyledInput onChange={(e) => setItemDetails(p => ({ ...p, fileContent: e.target.value }))} />
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
                <button onClick={() => {
                    console.log("current details of the object", JSON.stringify(itemDetails));
                    setState(p => ({ ...p, listOfFolders: [...p.listOfFolders, itemDetails] }))
                }}>
                    Submit
                </button>
            </CreateObjectContainer>
        </Modal>
    </Wrapper>
}