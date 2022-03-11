# Organizing Code with Modules

- Create Modules
  `nest g module computer`

## DI inside of a module

- Power Module

Power Service `supplyPower()` -> Regulator Service `regulatePower()`

1. Add the @Injectable() decorator to PowerService
2. Add the PowerService to the PowerModule's list of providers
3. Define the constructor method on RegulatorService and 'PowerService' to it

## DI between Modules

Power Service `supplyPower()` -> CPU Service `compute()`

1. Add PowerService to the PowerModule's list of exports
2. Import the PowerModule into the CpuModule
3. Define the constructor method on CpuService and add 'PowerService' to it
