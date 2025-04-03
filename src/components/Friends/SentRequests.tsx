import { GetSentRequests } from '@redux/actions/Friend.actions';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

type Props = {}

function SentRequests({ }: Props) {
    const dispatch = useDispatch();

    useEffect(() => {

        // TODO: fetch sent requests
        dispatch(GetSentRequests());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <div>SentRequests</div>
    )
}

export default SentRequests