import http from '../http';

// 用户信息类型
interface UserInfo {
  avatar: string;
  email: string;
  id: number;
  name: string;
  phone: string;
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getUserInfo() {
  return http.get<UserInfo>('/api/user/info');
}

/**
 * 创建新用户
 * @param userData 用户数据
 * @returns 创建的用户信息
 */
export function createUser(userData: Omit<UserInfo, 'id'>) {
  return http.post<UserInfo>('/api/user/create', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * 更新用户信息
 * @param id 用户ID
 * @param data 用户数据
 * @returns 更新结果
 */
export function updateUser(id: number, data: Partial<UserInfo>) {
  return http.put<UserInfo>(`/api/user/${id}`, data);
}
