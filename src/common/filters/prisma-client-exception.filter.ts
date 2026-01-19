// src/common/filters/prisma-client-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        // Lỗi Unique constraint (VD: Trùng Email)
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: `Dữ liệu đã tồn tại (Unique constraint failed)`,
          error: 'Conflict',
        });
        break;
      }
      case 'P2025': {
        // Lỗi không tìm thấy bản ghi (Record not found)
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: `Không tìm thấy bản ghi`,
          error: 'Not Found',
        });
        break;
      }
      default:
        // Các lỗi khác thì để NestJS tự xử lý mặc định
        super.catch(exception, host);
        break;
    }
  }
}
