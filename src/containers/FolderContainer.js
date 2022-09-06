import React from 'react';
import { useAppContext } from '../context-store';
import Folder from '../components/Folder';

export default function FolderContainer() {
    const something = useAppContext();
    console.log("<><><><> test", something);
    return <Folder />
}