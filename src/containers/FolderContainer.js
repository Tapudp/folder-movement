import React from 'react';
import { useAppContext } from '../context-store';
import Folder from '../components/Folder';
import styled from 'styled-components';

const FolderWrapper = styled.div`
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: minmax(150px, auto);
    grid-gap: 1em;
    height: 40rem;
    width: 100rem;
    overflow-y: auto;
    background-color: #F4F9EB;
    padding: 20px;
    margin: 0 4rem;
`;

export default function FolderContainer() {
    const { state, updatePathForUser } = useAppContext();

    if (state.listOfFiles.length < 1) {
        return <FolderWrapper> Start creating new file/objects </FolderWrapper>
    }

    return (
        <FolderWrapper>
            {
                state.listOfFiles.filter(file => file.path === state.currentPath).map((file, fileIdx) => (
                    <Folder
                        key={fileIdx}
                        switchPath={() => updatePathForUser(file.fileName)}
                        {...file}
                    />
                ))
            }
        </FolderWrapper>
    )
}