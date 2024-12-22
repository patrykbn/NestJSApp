import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtso/create-order.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateOrderDTO } from './dtso/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {
    this.ordersService = ordersService;
  }
  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }
  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const ordr = this.ordersService.getById(id);
    if (!ordr) throw new NotFoundException('Order not found...');
    return this.ordersService.getById(id);
  }
  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }
  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found...');

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }
  @Delete('/:id')
  public DeteleById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found...');
    this.ordersService.deleteById(id);
    return { success: true };
  }
}
