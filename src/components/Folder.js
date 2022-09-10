import React from 'react';
import styled from 'styled-components';

const FolderWrapper = styled.div`
    background-color: #DAF7A6;
    display: grid;
    grid-template-rows: 40px 40px 40px;
    padding: 1rem;
    height: 1fr;
    cursor: pointer;
`;

export default function Folder({ fileName, fileContent, fileType, switchPath }) {
    return (
        <FolderWrapper onClick={() => switchPath()}>
            <h4>{fileName || ''}</h4>
            <h6>{fileContent || ''}</h6>
            <div>{fileType || ''}</div>
        </FolderWrapper>
    )
}