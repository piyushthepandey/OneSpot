interface SignUpModel {
  userName: String;
  password: String;
  email: String;
  firstName: String;
  lastName: String;
  phoneNo: String;
  gender: String;
  dateOfBirth: String;
  country: String;
}

interface loginModel {
  email: String;
  password: String;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  gender: string;
}

interface UserLoggedInModel {
  personalInfo: PersonalInfo;
  _id: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  userRole: string;
  isUserEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export { type SignUpModel, type loginModel, type UserLoggedInModel };
