import React, { ReactElement, FC } from 'react';
import './Container.scss';

export interface ComponentProps {
    title: string;
    description?: string;
    headerButtons?: Array<ReactElement>;
    footerText?: string;
    pagination?: ReactElement;
    children: ReactElement;
}

const Container: FC<ComponentProps> = ({
    title,
    description,
    footerText,
    headerButtons,
    pagination,
    children,
}): ReactElement => {
    return (
        <div className="tableContainer">
            <div className="tableContainer_header">
                <div className="tableContainer_header__details">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div className="tableContainer_header__aside">
                    {headerButtons?.map((item, index) => (
                        <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                </div>
            </div>
            <div
                className="tableContainerBody"
                style={{ overflow: 'auto hidden' }}
            >
                {children}
            </div>
            <div className="tableContainerFooter">
                <div className="tableContainerFooterDetails">
                    <p>{footerText}</p>
                </div>
                {pagination}
            </div>
        </div>
    );
};

export default Container;
