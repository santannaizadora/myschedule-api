var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { appointmentRepository } from "../repositories/appointment.repository.js";
import dayjs from "dayjs";
var validateTime = function (initial_time, final_time) {
    if (dayjs(initial_time).isAfter(dayjs(final_time))) {
        throw {
            type: "bad_request",
            message: "A hora inicial deve ser antes da hora final"
        };
    }
    if (dayjs(initial_time).isSame(dayjs(final_time))) {
        throw {
            type: "bad_request",
            message: "A hora inicial e final não podem ser iguais"
        };
    }
};
var validateDate = function (date) {
    var today = dayjs().format("YYYY-MM-DD");
    if (date < new Date(today)) {
        throw {
            type: "bad_request",
            message: "A data não pode ser anterior a data atual"
        };
    }
};
var createAppointment = function (appointment) { return __awaiter(void 0, void 0, void 0, function () {
    var initial_time, final_time, date, initial, final;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                initial_time = appointment.initial_time, final_time = appointment.final_time, date = appointment.date;
                appointment.date = new Date(date);
                initial = new Date("".concat(date, " ").concat(initial_time));
                final = new Date("".concat(date, " ").concat(final_time));
                validateTime(initial, final);
                validateDate(date);
                appointment.initial_time = new Date(initial.getTime() - initial.getTimezoneOffset() * 60000);
                appointment.final_time = new Date(final.getTime() - final.getTimezoneOffset() * 60000);
                return [4 /*yield*/, appointmentRepository.insert(appointment)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getTodayAppointments = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var today;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                return [4 /*yield*/, appointmentRepository.findAppointmentByDateAndUser(today, user_id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getDayAppointments = function (date, user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var day;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                day = new Date(date);
                return [4 /*yield*/, appointmentRepository.findAppointmentByDateAndUser(day, user_id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var updateAppointment = function (id, appointment) { return __awaiter(void 0, void 0, void 0, function () {
    var initial_time, final_time, date, initial, final;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                initial_time = appointment.initial_time, final_time = appointment.final_time, date = appointment.date;
                validateTime(initial_time, final_time);
                validateDate(date);
                appointment.id = id;
                appointment.date = new Date(date);
                initial = new Date("".concat(date, " ").concat(initial_time));
                final = new Date("".concat(date, " ").concat(final_time));
                appointment.initial_time = new Date(initial.getTime() - initial.getTimezoneOffset() * 60000);
                appointment.final_time = new Date(final.getTime() - final.getTimezoneOffset() * 60000);
                return [4 /*yield*/, appointmentRepository.update(appointment)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getAppointment = function (id, user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var appointment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, appointmentRepository.findAppointmentByIdAndUser(id, user_id)];
            case 1:
                appointment = _a.sent();
                if (!appointment) {
                    throw {
                        type: "not_found",
                        message: "Agendamento não encontrado"
                    };
                }
                return [2 /*return*/, appointment];
        }
    });
}); };
var deleteAppointment = function (id, user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var appointment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAppointment(id, user_id)];
            case 1:
                appointment = _a.sent();
                return [4 /*yield*/, appointmentRepository.deleteAppointment(appointment.id)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getByMonth = function (month, year, user_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, appointmentRepository.getMonthAppointments(user_id, month, year)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var appointmentService = {
    createAppointment: createAppointment,
    getTodayAppointments: getTodayAppointments,
    getDayAppointments: getDayAppointments,
    updateAppointment: updateAppointment,
    getAppointment: getAppointment,
    deleteAppointment: deleteAppointment,
    getByMonth: getByMonth
};
