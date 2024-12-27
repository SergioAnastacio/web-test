<p align="center">
<a href="https://www.anasty.icu" target="_blank">
<img src="https://i.imgur.com/9T487Dt.png" width="350" alt="Prueba técnica Digitalife">
</a>
</p>
<p align="center">
<a href="https://github.com/SergioAnastacio/sa-web-test/actions/workflows/main.yml">
<img src="https://github.com/SergioAnastacio/sa-web-test/actions/workflows/main.yml/badge.svg" alt="Build Status"></a>
<br></br>
<a href="http://www.anasty.icu/" target="_blank"><img alt="website" src="https://img.shields.io/website?url=http%3A%2F%2Fapi.anasty.icu%2Fapi%2Fup"></a>

</p>

# SA-WEB-TEST

## Introducion
Parte **Frontend** del proyecto de administracion de inventarios en linea , desarollado en el framework de vue.js
aplicando arquitectura hexagonal y buenas practicas
## Que hace el proyecto?
Es una web interactiva con el usuario para manejar eficientemente un inventario en linea. tiene un control de acceso , un dashboard para visualizar los productos
posibilidad de editar los productos , crear nuevos productos , subir imagenes de los productos. 


## Inicio rapido
1. **Clonar el repositorio**:

    - Si no tienes el CLI de Github instalado:
    ```bash
        git clone https://github.com/SergioAnastacio/sa-api-test.git
    ```
    - Si tienes el CLI
    ```bash
        gh repo clone SergioAnastacio/sa-api-test
    ```
2. **Configuracion**:
   - 💡 **TIP:** Recomiendo instalar la version LTS de node v22.12.0
- Instalacion de NODE usando node version manager
  - Abre una terminal de powershell de administrador , descarga e instala  el node version manager
  ```powershell
    Invoke-WebRequest -Uri https://raw.githubusercontent.com/coreybutler/nvm-windows/master/nvm-setup.zip -OutFile nvm-setup.zip
    Expand-Archive nvm-setup.zip -DestinationPath .
    .\nvm-setup.exe
  ```
  - Instala Node.js usando nvm ( puedes cambiar la version a la que requieras)
  ```powershell
    nvm install 22.12.0
    nvm use 22.12.0
  ```
  - Verifica la instalacion
  ```powershell
    node -v
    npm -v
  ```
- Instalar las depndencias del proyecto. sa-web-test (El proyecto tiene configuracion por defecto .vscode)
  -  Cntrol+j para abrir la baja inferior , Cntrol+5 para abir una terminal dentro de vs code ( si es que no se abre una por defecto)
  Ejecutamos el comando : 
  ```bash
    npm install 
  ```
  🥸 **Nota**: desde la version 22.10.0 de node podemos ejecutar los comandos nativamiente (son mas rapidos que usar el gestor de paquetes npm)
- Iniciamos el servidor de desarollo usando el comando :
  ```bash
    node --run dev
  ```
  Tenemos listo el proyecto para desarollar.

## Tutoreales
### Como crear un build de la app
Para construir el build de la app deberemos ejecutar el siguiente comando:
```bash
    node --run build
```
Automaticamente ejecutara el proceso de construcion y  creara nuestra carpeta de distribucion llamada `dist/` en la raiz de nuestro proyecto.

Si el build **Falla** te mostrara la razon por la cual fallo.
### Como Ejecutar el formateo del proyecto
Para mantener la consistencia del proyecto se utiliza un formateador que nos ayudara a mantener el codigo con las reglas que se definieron por defecto. Para ejecutarlo manualmente usamos
```bash
    node --run format
```
En dado caso de que falle el formateo mostrara el error en consola.
### Como Ejecutar el linteo del proyecto
Con el mismo propocito de manetener la homogenidad del codigo  usamos un linter que nos asegura que el codigo no contiene errores de sintaxis  y entre otras reglas que definimos por default:  Para ejecutarlo manualmente usamos:
```bash
    node --run lint
```
En dado caso que exista un error se mostrara en pantalla. 

### Como Ejecutar la collection de pruebas
En le proyecto hay 3 tipos de pruebas
1. Pruebas unitarias
   - Son pruebas que se enfocan a una sola pieza de la app com por ejemplo `Componentes`
2. Pruebas e2e
   - Son pruebas de inicio a fin , probando una funcionalidad en especifico  por ejemplo  una **Implementacion** de una caracteristica nueva 
3. Prueba de covertura
   - Es una metrica que nos informa cuanto codigo ha sido provado. usualmente se espera que este dentro del rango de **80%**

Ejecucion de pruebas unitarias
```bash
   node --run test:unit 
```
Se ejecutan las pruebas y en dado caso de no pasar las pruebas muestra el error en consola.

Ejecucion de pruebas e2e
```bash
   node --run test:e2e
```
Se ejecutan las pruebas y en dado caso de no pasar las pruebas muestra el error en consola.

Ejecucion de prueba de covertura
```bash
   node --run test:coverage
```
Se ejecuta la covertura y nos retorna el valor de  covertura de codigo.



## Explicacion

### Manejo del `config.ts`
En el archivo `config.ts` que esta `/src` es un archivo que nos permite cargar las configuraciones de las variables de entorno y hacerlas accesibles en toda la app. 


## Como se hace ?

### Como podemos agregar una nueva entidad al dominio ?
El proceso es el siguiente
- Definir la entidad de dominio
- Definir los value objects de nuestro dominio
- Definir el Aggregate que sera el que interactuara con nuestra entidad

1. **Creamos los valueObj de nuestro entitie**
   - En la carpeta de `core/domain/valueobj`
   ```ts
    //* Important : definir las variables en el constructor es una forma actual de declaracion
    //* al igual que definir los metodos de acceso. ( Son muy similares a C ó C++ )
    export class ValueObj
    {
        constructor(private readonly _value:string){
            //Algun metodo de comprobacion del contructor
        }
        get value():string
        {
            return this._email
        }
        private validateFunction(value:string):boolean
        {
            // Realiza comprobaciones...
        }
    }
   ```
        El objetivo del value obj es tener un "objeto inmutable" el cual se asigne al dominio para segurar la integridad de los datos 
2. **Creamos la entidad que tiene nuestro valueobj** que siga la convencion UpperCase `NuevoDominio`
   - En la carpeta de `core/domain/entities` creamos una classe base
   ```ts
    import type{ ValueObj } from "../valueobj/ValueObj";
    export class Entitie{
        constructor(
            private _valueobj:ValueObj;
        ){}
        get valueobj():string
        {
            return this._valueobj;
        }
    }
   ```
3. **Creamos el aggregate de nuestra enditdad** sera el encargado de manejar operaciones de nuestro agregate.
   - En la carpeta de `core/domain/aggregate`
   ```ts
        import { Entitie }from "../entities/Entitie";
        import { ValueObj }from "../valueobj/ValueObj";
        //* Podemos interactuar con otros agregates , pero no podemos interactuar con las entidades y/o value objects de otro agregate.
        export class EntitieAggregate{
            private entitie:Entitie;
            constructor(entitie:Entitie){
                this.entitie=entitie
            }
            get value():string
            {
                return this.entitie.value;
            }
            //* importnant en esta seccion podemos definir ciertos metodos para las operaciones del negocio.
        }
   ```
        De esta forma interactuamos el agregate y no con la propiedad directamente.

### Como podemos crear un port para nuestro dominio ?
El proceso es el siguiente:
- Creamos un Repositorio es donde se definiran los metodos de acceso.(operaciones)

1. **Creamos el repository que sera el contrato que se devera cumplir**
en la carptea de `/core/port` se creara un archivo con nomenclaruea UpperCase `EntitieRepository`
```ts
    import type{EntitieAggregate}from "../domain/agregates/EntitieAgregate"

    export interface EntitieRepository{
        metodo1():Promise<EntitieAggregate|null>;  //! En caso que no se resuelva  devolvera null.
        // usamos promise por que la llamada al recurso sera asincrona.
        // asi no bloqueamos el hilo principal de ejecucion
    }
```
        Teniendo este contrato nos aseguraremos que la implementacion pueda hacerse en un archivo separado , que probablemente en el tiempo cambiemos la locacion de nuestro recurso de la app.  o probar nuevas tecnologias

### Como podemos realizar una implementacion de nestro Port
El proceso de creacion de una implementacion de un contrato es el siguiente:
- Importamos una instancia de axios personalizada para manajear las consultas al repositorio.
- Creamos un Schema y lo usaremos para validad los datos que nos entrega el repositorio
- Creamos un metodo de Mapeo de objetos para transformar los datos del repositorio al contexto de la app(Aggregates).
- En caso de que falle manejar los errores correctamente.

1. **Creamos el Schema de validacion** en la locacion de `core/adapter/DTOs/` con el nombre de `EntitieDTO`
    ```ts
        import { z }from "zod"
        export const EntitieDTOSchema = z.object({
            proiedad1: z.number(),
            proiedad2: z.string().email(),
            proiedad3: z.string().url(),
        });
        export type EntitieDTO= z.infer<typeof EntitieDTOSchema>;
    ```
        De esta forma nos permitira validar la informacion del repositorio en la respuesta.
2. **Creamos el mapper in /out de nuestro aggregate** en la locacion de `core/adapter/MAPS/` con el nombre de `EntitieMAP`
    ```ts
        import {Entitie}from "/core/domain/entities/Entities"
        import {EntitieAggregate} from "core/domain/agregates/EntitieAggregate"
        import type {EntitieDTO}from "core/adapter/DTOs/EntitieDTO"
        import {ValueObj}from "core/domain/valueobj/ValueObj"
        export const toDomain=(dto EntitieDTO):EntitieAggregate =>{
            const entitie = Entitie(dto.propiedad1,new ValueObj(dto.propiedas2),dto.propiedad3);
            return new EntitieAggregate(entitie);
        }
        export const toDTO =(entitieAgregate:EntitieAggregate):EntitieDTO=>{
            return {
                propiedad1:entitieAgregate.propiedad1
                propiedad2:entitieAgregate.propiedad2.value
                propiedad3:entitieAgregate.propiedad3
            }
        }        
    ```
        De esta forma tenemos una utilidad que nos permite transformar del dominio al repositorio y del repositorio al dominio. si el dia de ma;ana cambia un tipo de dato solo debemos de cambiar el schema (algunas veces tambien en el dominio)
3. **Creamos nuestro archivo de implementacion** con el nombre y en la locacion de `core/adapter/EntitieRepositoryImp`
    ```ts
        import type { EntitieRepository } from "/core/port/EntitieRepository"
        import {toDomain,toDTO}from "core/adapter/MAPs/EntitieMAP"
        import {EntitieAggregate}from "core/domain/aggergates/entitieaggergate"
        import {axiosInstance}from "/core/adapter/AxiosConfig"
        export class EntitieRepositoryImp implements EntititeRepository{

            metodo1():Promise<EntitieAggregate|null>{
                try{
                    const response= await axiosinstance.get('/endpoint');
                    const parseData= EntitieDTOSchema.parse(respone.data.data); 
                    // si el repositorio responde con una collection en data  
                    // deberas indicar data.data para acceder a los datos 
                    // dentro del objeto data de respuesta.
                    return toDomain(parseData)
                }catch(error){
                    return null;  
                    // Aqui podemos manejar los errores 
                    // con un throw new Error();
                }
            }
        }
    ```
        De esta forma  solo nos preocupamos por los detalles de la implementacion en este archivo y lo demas a las capas internas. 
### Como podemos crear casos de uso (Appservices)
El proceso es el siguiente:
- Creamos una classe que use el contrato y no la classe que se implementa. 
1. **Creamos nuestro Caso de uso** la locacion  `/core/port/appservices/entitie/` con el nombre de `AccionEntitieUseCase` 
```ts
    import type{EntitieRepository}from "/core/port/EntitieRepository"
    import {EntitieAggregate} from "core/domain/aggregates/EntitieAggregate"
    export class AcctionEntitieUseCase{
        constructor(private entitieRepository:EntitieRepository){}
        async execute():Promise<EntitieAggregate | null>{
            return await this.entitieRepository.metodo1();
        }
    }
```
    De esta forma podemos crear diferentes casos de uso que dependan de la interface/contrato y no de la implementacion
### Como se usa un caso de uso ?
Para hacer uso de un caso de uso recomiendo utilizar los Stores ya que son piesas de codigo que si se ejecutan bien solo llamaran a la api una sola vez. ( Similiar a ReactQuery pero aqui nosotros tenemos definir los comportamientos del almacenamiento)

```ts
    import {defineStore} from "pinia"
    import {ref}from "vue"
    import {EnttitieAggregate} from "core/domain/aggregates/EntitieAggregate"
    import {EntititeRepositoryImp} from "/core/adapter/EntitieRepositoryImp"
    import {ActionEntitieUseCase} from "/core/port/appservice/ActionEntitieUseCase"
    export const useNameStore= defineStore("NameStore",()=>{
        const entitie = ref<EntitieAggregate|null>(null)
        const fetchdata=async()=>{
            // podemos facilmente crear la implementacion afuera de la funcion
            // y usarla dentro en el bloque try
            const entitierepository= new EntitieRepositoryImp();
            const actionentitieusecase= ActionEntitieUseCase(entitierepository)
            try{
            entitie.value= await actionentitieusecase.execute();
            }catch(err){
                //aqui manejamos el error
            }finally{
                // se ejecuta por default al final del ciclo de ejecucion
            }
        };
        return{
            entitie,
            fetchdata,
        }
    });
```
    De esta forma podemos llamar a funcion manualmente en el componente que se requiera.
    El store funciona similar a los CustomHooks de react.
Ejemplo de uso en un componente de vue
```vue
    <template>
    <div>
        <p>{{entitiestore.entitie.propiedad1}}</p>
    </div>
    </template>
    <script setup lang="ts">
    import {useNameStorage}from "stores/useNameStore"
    import {onMounted}from vue
    //! Important
    // Si aplican destructoring se rompe la reactividad
    // y no podran obtener los datos actualizados
    const entitiestore=useNameStorage();
    onMounted(()=>{
        entitiestore.fetchData();
    })
    </script>
    <style>
        /*Algunos stilos aqui*/
    </style>
```
### Como podemos crear una test unitario para un nuevo componente
1. **Creamos un componente**
    Primero crea el componente , por ejemplo :
    ```vue
        <template>
        <div class="nuevo-componente">
            <p>{{output}}</p>
        </div>
        </template>
        <script setup lang="ts">
        defineProps<{
            output: string
        }>
        </script>
        <style scoped>
        p{
            font-size: 1.2rem;
            text-align: center;
            color: blue;
        }
        </style>
    ```

2. **Despues crea el test del componente**
    ```vue
        import {describe,it,expect} from vitest
        import nuevo-componente from @/components/nuevo-componente.vue

        describe('nuevo-componente.vue',()=>{
            it('render props.output when passed',()=>{
                const contenedor= mount(nuevo-componente,{props:{output:"mensaje de pueba"}});
                expect(contenedor.text().toContain("mensaje de prueba"));
            });
        });

    ```
    De esta forma podemos probar componentes por separado verificando diferentes caracteristicas y asegurando su correcto funcionamiento.

    Recuerda que el archivo de prueba tiene que estar en la carpeta de `__test__` y con el nombre de `nuevo-componente.spec.ts` para ejecutar las pruebas  usamos el comando:
    ```bash
        node --run test:unit
    ```
### Como podemos crear un test end to end  para un caso en especifico
1. **Creamos un test e2e** en la carpeta de E2E
   - Creaos un nuevo archivo llamado `caracteriztica.spec.ts`
   ```ts
        import { test, expect } from '@playwright/test';

        test('visits a rute /login',async({page})=>{
            await page.goto('http://localhost:5174/login');
            await expect(page.locator('div.login > h1').tohaveText('Login'));
        });
   ``` 
   De esta forma podemos probar su funcionamiento desde diferentes navegadores.
   Para ejecutar las prueebas usa :
   ```bash
    node --run test:e2e
   ```

## Referencias
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html/)
- [DDD](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf)
- [vitest docs](https://vitest.dev/guide/)
- [playwright docs](https://playwright.dev/docs/intro)