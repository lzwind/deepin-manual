/*
 * Copyright (C) 2017 ~ 2018 Deepin Technology Co., Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#ifndef DEEPIN_MANUAL_VIEW_WIDGET_SEARCH_EDIT_H
#define DEEPIN_MANUAL_VIEW_WIDGET_SEARCH_EDIT_H

#include <DSearchEdit>

namespace dman {

/**
 * @brief The SearchEdit class
 * 标题栏中的搜索框，居中显示
 */
class SearchEdit : public Dtk::Widget::DSearchEdit
{
    Q_OBJECT
public:
    explicit SearchEdit(QWidget *parent = nullptr);
    ~SearchEdit() override;

signals:
    void downKeyPressed();
    void enterPressed();
    void upKeyPressed();
    void onClickedClearBtn();

protected:
    void keyPressEvent(QKeyEvent *event) override;
};

} // namespace dman

#endif // DEEPIN_MANUAL_VIEW_WIDGET_SEARCH_EDIT_H
