import {Component, OnInit} from '@angular/core';
import {TodoDataService} from './todos/todo-data.service';
import {CategoryDataService} from './categories/category-data.service';
import {Todo} from './todos/todo';
import {Category} from './categories/category';

@Component({
    selector: 'mdb-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [TodoDataService, CategoryDataService]

})

export class AppComponent implements OnInit {
    newTodo: Todo = new Todo();
    newCategory: Category = new Category();
    selectedCategory: Category;

    constructor(private todoDataService: TodoDataService, private  categoryService: CategoryDataService) {
    }

    addTodo() {
        this.newTodo.category = this.selectedCategory.id;
        this.todoDataService.addTodo(this.newTodo);
        this.newTodo = new Todo();
        console.log(this.todos);
    }

    toggleTodoComplete(todo) {
        this.todoDataService.toggleTodoComplete(todo);
    }

    removeTodo(todo) {
        this.todoDataService.deleteTodoById(todo.id);
    }

    get todos() {
        return this.todoDataService.getAllTodos();
    }

    get todosForCat() {
        return this.todoDataService.getTodoByCategory(this.selectedCategory.id)
    }

    countTodosByCat(id: number) {
        return this.todoDataService.getTodoByCategory(id).length;
    }

    addCategory() {
        this.categoryService.addCategory(this.newCategory);
        this.newCategory = new Category();
    }

    removeCategory(category) {
        this.categoryService.deleteCategoryById(category.id);
    }

    get categories() {
        return this.categoryService.getAllCategories();
    }

    categoryById(id: number) {
        return this.categoryService.getCategoryById(id);
    }

    addInitialCategory(category) {
        return this.categoryService.addCategory(category);
    }

    addInitialTodo(todo) {
        return this.todoDataService.addTodo(todo);
    }

    onSelect(category: Category): void {
        this.selectedCategory = category;
    }

    ngOnInit() {
        let initCat = new Category();
        initCat = {'name':'Today', 'id': null};
        this.addInitialCategory(initCat);
        initCat = {'name':'Tomorrow', 'id': null};
        this.addInitialCategory(initCat);
        initCat = {'name':'Work', 'id': null};
        this.addInitialCategory(initCat);
        initCat = {'name':'Holidays', 'id': null};
        this.addInitialCategory(initCat);
        initCat = {'name':'Shopping', 'id': null};
        this.addInitialCategory(initCat);

        let initTodo = new Todo();
        initTodo = {'title':'Task 1', 'complete':false, 'id':null, 'category':1};
        this.addInitialTodo(initTodo);
        initTodo = {'title':'Task 2', 'complete':true, 'id':null, 'category':2};
        this.addInitialTodo(initTodo);
        initTodo = {'title':'Task 3', 'complete':false, 'id':null, 'category':1};
        this.addInitialTodo(initTodo);
    }
}
