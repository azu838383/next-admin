import { type ThunkDispatch } from 'redux-thunk'
import { type AnyAction } from 'redux'
import get from 'lodash/get'
import jwt, { type JwtPayload } from 'jsonwebtoken';
import api from '../api';
import { API_URL } from '@/libs/constants';

export const getLanguages = () => async (dispatch: ThunkDispatch<object, object, AnyAction>) => {
	try {
		const response = await api.get(`${API_URL}/get-language`)
		const results = get(response.data, 'data.countries', [])
		return results
	} catch (error) {
		throw new Error(
			get(error, 'response.data.message.error', 'Unknown error! Please try again later.'),
		)
	}
}

export function decodeToken(token: string): JwtPayload {
	const decoded = jwt.decode(token, { complete: true });

	return decoded?.payload as JwtPayload ?? new Error('Invalid token');
}

