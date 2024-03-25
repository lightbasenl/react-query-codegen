import { Server, Response } from 'miragejs';

const routes = function () {
  this.post('/v1/auth/register/', () => {
    return new Response(200, {}, { message: 'Register route handled' });
  });

  this.post('/v1/auth/request-authentication/', () => {
    return new Response(200, {}, { message: 'Request authentication route handled' });
  });

  this.post('/v1/auth/authenticate/', () => {
    return new Response(200, {}, { message: 'Authenticate route handled' });
  });

  this.post('/v1/auth/refresh-token/', () => {
    return new Response(200, {}, { message: 'Refresh token route handled' });
  });

  this.post('/v1/account/register-device/', () => {
    return new Response(200, {}, { message: 'Register device route handled' });
  });

  this.put('/v1/account/update-personal-data/', () => {
    return new Response(200, {}, { message: 'Update personal data route handled' });
  });

  this.post('/v1/account/change-email/', () => {
    return new Response(200, {}, { message: 'Change email route handled' });
  });

  this.post('/v1/account/request-verification-email/', () => {
    return new Response(200, {}, { message: 'Request verification email route handled' });
  });

  this.put('/v1/account/update-medical/', () => {
    return new Response(200, {}, { message: 'Update medical route handled' });
  });

  this.put('/v1/account/update-consent/', () => {
    return new Response(200, {}, { message: 'Update consent route handled' });
  });

  this.post('/v1/account/create-appointment/', () => {
    return new Response(200, {}, { message: 'Create appointment route handled' });
  });

  this.get('/v1/account/me/', () => {
    return new Response(200, {}, { message: 'Get account route handled' });
  });

  this.put('/v1/account/update/', () => {
    return new Response(200, {}, { message: 'Update account route handled' });
  });

  this.delete('/v1/account/delete/', () => {
    return new Response(200, {}, { message: 'Delete account route handled' });
  });

  this.get('/v1/subusers/', () => {
    return new Response(200, {}, { message: 'Get subusers route handled' });
  });

  this.post('/v1/subusers/', () => {
    return new Response(200, {}, { message: 'Create subuser route handled' });
  });

  this.post('/v1/subusers/:subuser_id/login/', (schema, request) => {
    const subuserId = request.params.subuser_id;
    return new Response(200, {}, { message: `Login for subuser ${subuserId} route handled` });
  });

  this.post('/v1/caregiver-requests/', () => {
    return new Response(200, {}, { message: 'Create caregiver request route handled' });
  });

  this.put('/v1/caregiver-requests/:id/', (schema, request) => {
    const requestId = request.params.id;
    return new Response(200, {}, { message: `Update caregiver request ${requestId} route handled` });
  });

  this.get('/v1/dossier/prescriptions/', () => {
    return new Response(200, {}, { message: 'Get prescriptions route handled' });
  });

  this.get('/v1/dossier/prescriptions/:prescription_id/', (schema, request) => {
    const prescriptionId = request.params.prescription_id;
    return new Response(200, {}, { message: `Get prescription ${prescriptionId} route handled` });
  });

  this.get('/v1/dossier/medicines/', () => {
    return new Response(200, {}, { message: 'Get medicines route handled' });
  });

  this.get('/v1/dossier/medicines/:medicine_id/', (schema, request) => {
    const medicineId = request.params.medicine_id;
    return new Response(200, {}, { message: `Get medicine ${medicineId} route handled` });
  });

  this.get('/v1/dossier/prescription-requests/', () => {
    return new Response(200, {}, { message: 'Get prescription requests route handled' });
  });

  this.post('/v1/dossier/prescription-requests/', () => {
    return new Response(200, {}, { message: 'Create prescription request route handled' });
  });

  this.post('/v1/dossier/orders/', () => {
    return new Response(200, {}, { message: 'Create order route handled' });
  });

  this.get('/v1/dossier/orders/:order_id/', (schema, request) => {
    const orderId = request.params.order_id;
    return new Response(200, {}, { message: `Get order ${orderId} route handled` });
  });

  this.get('/v1/dossier/timeline/', () => {
    return new Response(200, {}, { message: 'Get timeline route handled' });
  });

  this.post('/v1/dossier/timeline/close/', () => {
    return new Response(200, {}, { message: 'Close timeline route handled' });
  });

  this.post('/v1/phone-number-verification/', () => {
    return new Response(200, {}, { message: 'Phone number verification route handled' });
  });

  this.post('/v1/verify-token/', () => {
    return new Response(200, {}, { message: 'Verify token route handled' });
  });

  this.get('/v1/available-timeslots/', () => {
    return new Response(200, {}, { message: 'Get available timeslots route handled' });
  });

  this.get('/v1/general-practitioners-search/', () => {
    return new Response(200, {}, { message: 'General practitioners search route handled' });
  });

  this.get('/v1/suggest-order-eta/', () => {
    return new Response(200, {}, { message: 'Suggest order ETA route handled' });
  });

  this.post('/v1/address-lookup/', () => {
    return new Response(200, {}, { message: 'Address lookup route handled' });
  });

  this.post('/v1/prescription-upload/retrieve-url/', () => {
    return new Response(200, {}, { message: 'Retrieve prescription upload URL route handled' });
  });

  this.passthrough();
};
