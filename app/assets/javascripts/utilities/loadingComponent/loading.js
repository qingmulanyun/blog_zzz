import React from 'react';
import { CircularProgress } from 'material-ui';

import './loading.scss';

export const Loading = () => (
    <div className="loading-shading-mui">
        <CircularProgress className="loading-icon-mui" />
    </div>
);